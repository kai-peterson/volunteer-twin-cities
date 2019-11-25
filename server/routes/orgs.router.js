const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM orgs ORDER BY id`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error in /api/orgs route', error);
            res.sendStatus(501)
        })
});

router.get('/user', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT id, name FROM orgs WHERE admin_id=$1 ORDER BY id`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error in /api/orgs/user route', error);
            res.sendStatus(501)
        })
});

router.get('/details/:id', (req, res) => {
    const queryText = `SELECT * FROM orgs WHERE id=$1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in /api/orgs/details route', error);
            res.sendStatus(501)
        })
});

router.get('/events/:id', (req, res) => {
    const queryText = `SELECT * FROM "events" WHERE "org_id"=$1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in /api/orgs/events route', error);
            res.sendStatus(501)
        })
});

router.get('/user/events', (req, res) => {
    const queryText = `SELECT "events"."name", events.event_description, events.event_start, 
                            events.event_end, events.reqs, orgs.name as org_name FROM events 
                            JOIN users_events ON events.id=users_events.event_id 
                            JOIN orgs ON orgs.id=events.org_id 
                            WHERE user_id=$1`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in /api/orgs/user/events route', error);
            res.sendStatus(501)
        })
});

router.get('/event/users/:event_id', (req, res) => {
    const queryText = `SELECT "user".username as "name", "user".email FROM users_events 
                        JOIN "user" ON users_events.user_id="user"."id" 
                        WHERE event_id=$1`;
    pool.query(queryText, [req.params.event_id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in /api/orgs/event/users route', error);
            res.sendStatus(501)
        })
});

router.delete('/event/delete/:event_id', (req, res) => {
    console.log('in event delete route', req.params);

    const queryTextJunction = `DELETE FROM users_events WHERE event_id=$1`;
    pool.query(queryTextJunction, [req.params.event_id])
        .then((result) => {
            const queryTextMain = `DELETE FROM events WHERE id=$1`;
            pool.query(queryTextMain, [req.params.event_id])
                .then((result) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('error in /api/orgs/event/delete route', error);
                    res.sendStatus(501)
                })
        })
        .catch((error) => {
            console.log('error in /api/orgs/event/delete route', error);
            res.sendStatus(501)
        })
});

router.get('/event/details/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "events" WHERE "id"=$1`;
    console.log('in EVENT DETAILS route', req.params.id);
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in /api/orgs/event/details route', error);
            res.sendStatus(501)
        })
});

router.post('/event/signup/:event_id', (req, res) => {
    console.log('hit');

    const queryText = `INSERT INTO users_events (user_id, event_id) VALUES ($1, $2)`;
    pool.query(queryText, [req.user.id, req.params.event_id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /event/signup/:event_id route', error);
            res.sendStatus(501)
        })
});

router.put('/details/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE orgs SET "name"=$1, "type"=$2, "address"=$3, "intro"=$4, "mission"=$5, "message"=$6 WHERE id=$7`;
    const queryInfo = [req.body.name, req.body.type, req.body.address, req.body.intro, req.body.mission, req.body.message, req.params.id]
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /api/orgs/details route', error);
            res.sendStatus(501)
        })
});

router.get('/details/images/:id', (req, res) => {
    const queryText = `SELECT image FROM org_images WHERE org_id=$1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error in /api/orgs/details route', error);
            res.sendStatus(501)
        })
});

router.post('/profile/create/org', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO orgs ("admin_id", "name", "type", "intro", "image", "mission", "message", "address") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    const queryInfo = [Number(req.user.id), req.body.name, req.body.type, req.body.intro, req.body.image, req.body.mission, req.body.message, req.body.address];
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /api/orgs/profile/create route', error);
            res.sendStatus(501)
        })
})

router.post('/profile/create/event', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO events ("org_id", "name", "event_description", "event_start", "event_end", "reqs") VALUES ($1, $2, $3, $4, $5, $6)`
    const queryInfo = [req.body.org_id, req.body.name, req.body.description, req.body.start, req.body.end, req.body.reqs];
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /api/orgs/profile/create route', error);
            res.sendStatus(501)
        })
})

router.post('/images/:id', (req, res) => {
    console.log('HIT THIS ROUTE');

    const queryText = `INSERT INTO org_images ("org_id", "image") VALUES ($1, $2)`
    const queryInfo = [req.params.id, req.body.image];
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /images/:id route', error);
            res.sendStatus(501)
        })
})

module.exports = router;