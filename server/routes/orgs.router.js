const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM orgs ORDER BY id`;
    pool.query(queryText)
        .then( (result) => {
            res.send(result.rows)
        })
        .catch( (error) => {
            console.log('error in /api/orgs route', error);
            res.sendStatus(501)
        })
});

router.get('/user', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT id, name FROM orgs WHERE admin_id=$1 ORDER BY id`;
    pool.query(queryText, [req.user.id])
        .then( (result) => {
            res.send(result.rows)
        })
        .catch( (error) => {
            console.log('error in /api/orgs/user route', error);
            res.sendStatus(501)
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
            res.sendStatus(501)
        })
});

router.put('/details/:id', rejectUnauthenticated,(req, res) => {
    const queryText = `UPDATE orgs SET "name"=$1, "type"=$2, "address"=$3, "intro"=$4, "mission"=$5, "message"=$6 WHERE id=$7`;
    const queryInfo = [req.body.name, req.body.type, req.body.address, req.body.intro, req.body.mission, req.body.message, req.params.id]
    console.log('HIT DETAILS PUT ROUTE');
    
    pool.query(queryText, queryInfo)
        .then( (result) => {
            res.sendStatus(200) 
        })
        .catch( (error) => {
            console.log('error in /api/orgs/details route', error);
            res.sendStatus(501)
        })
});

router.get('/details/images/:id', (req, res) => {
    console.log('HIT IMAGES ROUTE', req.params.id);
    
    const queryText = `SELECT image FROM org_images WHERE org_id=$1`;
    pool.query(queryText, [req.params.id])
        .then( (result) => {
            res.send(result.rows);  
        })
        .catch( (error) => {
            console.log('error in /api/orgs/details route', error);
            res.sendStatus(501)
        })
});

router.post('/profile/create', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO orgs ("admin_id", "name", "type", "intro", "image", "mission", "message", "address") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    const queryInfo = [Number(req.user.id), req.body.name, req.body.type, req.body.intro, req.body.image, req.body.mission, req.body.message, req.body.address];
    pool.query(queryText, queryInfo)
        .then( (result) => {
            res.sendStatus(200)
        })
        .catch( (error) => {
            console.log('error in /api/orgs/profile/create route', error);
            res.sendStatus(501)
        })
})

module.exports = router;