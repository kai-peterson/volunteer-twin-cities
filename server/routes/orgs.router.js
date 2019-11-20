const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM orgs`;
    pool.query(queryText)
        .then( (result) => {
            console.log(result);
            res.send(result.rows)
        })
        .catch( (error) => {
            console.log('error in /api/orgs route', error);
        })
});

router.get('/details/:id', (req, res) => {
    const queryText = `SELECT * FROM orgs WHERE id=$1`;
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            res.send(result.rows);  
        })
        .catch( (error) => {
            console.log('error in /api/orgs/details route', error);
        })
});

router.get('/details/images/:id', (req, res) => {
    console.log('HIT IMAGES ROUTE', req.params.id);
    
    const queryText = `SELECT image FROM org_images WHERE org_id=$1`;
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            console.log(result.rows);
            
            res.send(result.rows);  
        })
        .catch( (error) => {
            console.log('error in /api/orgs/details route', error);
        })
});

router.post('/', (req, res) => {

});

module.exports = router;