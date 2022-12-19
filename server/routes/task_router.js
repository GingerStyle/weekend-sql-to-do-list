//import dependencies
const express = require('express');
const pool = require('../modules/pool.js');
//create router
let router = express.Router();

//routes
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM tasks ORDER BY id asc;';
    pool.query(queryText).then((result) => {
        console.log('results from db', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('error getting data', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    let queryText = 'INSERT INTO tasks ("task", "completed") VALUES ($1, $2);';
    let newTask = req.body;
    pool.query(queryText, [newTask.task, newTask.completed])
    .then((result) => {
        console.log('results', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error posting data', error);
        res.sendStatus(500);
    });
});

router.put('/completed/:id', (req, res) => {
    console.log('req.params.status',req.body.status);
    console.log('req.params.id', req.params.id);
    let queryText = `UPDATE "tasks" SET "completed" = '${req.body.status}' WHERE "id" = ${req.params.id};`;
    pool.query(queryText)
    .then((response) => {
        console.log('db response', response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error updating database', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    let queryText = `DELETE FROM "tasks" WHERE "id" = ${req.params.id};`;
    pool.query(queryText)
    .then((response) => {
        console.log('response from db', response);
        res.sendStatus(204);
    }).catch((error) => {
        console.log('problem with delete query', error);
        res.sendStatus(500);
    });
});


module.exports = router;