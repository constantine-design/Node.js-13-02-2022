const { Router } = require('express');
const path = require('path');
const fs = require('fs');
const res = require('express/lib/response');
const bp = require('body-parser');
const yargs = require('yargs');
const { verbose, verboseSteam } = require(path.join(__dirname,'..','..','..','utils','verbose'));
const con = require(path.join(__dirname,'..','..','..','utils','log'));
const { todoProvider } = require(path.join(__dirname,'..','services', 'todoProvider.js'));

const appArgs = yargs(process.argv).argv;

homeRouter = Router();
homeRouter.use(bp.json());
homeRouter.use(bp.urlencoded({ extended: true }));


homeRouter.get('/', (req, res)=>{
    let template = "";
    const index$ = fs.createReadStream( path.join(__dirname,'..','..','..','public','views','index.html'), { encoding: 'utf8' } );
    index$.on( 'data', data => template += data );
    index$.on( 'end', async () => { 
        const items = await todoProvider.getItems();
        const list = items.map( e => `<li><strong>[${e.timestamp}]</strong> ${e.value}</li>` ).join('\n');
        template = template.replace('{{ list }}',list);
        res.send(template); 
    } );
    index$.on( 'error', e => res.status(500).send("ERROR: Stream failed") )
    if (appArgs.con) con.gray(`Sent: index.html`);
});

homeRouter.post('/', async (req, res) => {
    await todoProvider.setItem({ value: req.body.todo, timestamp: new Date().toISOString() });
    res.redirect('/');
    if (appArgs.con) con.gray(`Added TODO: ${req.body.todo}`);
})

module.exports = { homeRouter }





