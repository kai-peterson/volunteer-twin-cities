const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM orgs`;
    pool.query(queryText)
        .then( (result) => {
            console.log(result);
            res.send(result.rows)
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;