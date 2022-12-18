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

module.exports = router;