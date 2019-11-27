const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const CronJob = require('cron').CronJob;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', rejectUnauthenticated, (req, res) => {
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

router.get('/details/:id', rejectUnauthenticated, (req, res) => {
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

router.get('/events/:id', rejectUnauthenticated, (req, res) => {
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

router.get('/user/events', rejectUnauthenticated, (req, res) => {
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

router.get('/event/users/:event_id', rejectUnauthenticated, (req, res) => {
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

router.delete('/event/delete/:event_id', rejectUnauthenticated, (req, res) => {
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

router.put('/event/update/:event_id', rejectUnauthenticated, (req, res) => {
    console.log('hit update route', req.body);

    const queryText = `UPDATE events SET "name"=$1, "event_description"=$2, "event_start"=$3, "event_end"=$4, "reqs"=$5, "address"=$6 WHERE id=$7`;
    const queryInfo = [req.body.name, req.body.description, req.body.start, req.body.end, req.body.reqs, req.body.address, req.params.event_id]
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /api/orgs/details route', error);
            res.sendStatus(501)
        })
});


router.post('/event/signup/:event_id', rejectUnauthenticated, (req, res) => {
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

router.get('/details/images/:id', rejectUnauthenticated, (req, res) => {
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
    const queryInfo = [Number(req.user.id), req.body.name, req.body.type, req.body.intro, req.body.image.image, req.body.mission, req.body.message, req.body.address];
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
    const queryText = `INSERT INTO events ("org_id", "name", "event_description", "event_start", "event_end", "reqs", "address") VALUES ($1, $2, $3, $4, $5, $6, $7)`
    const queryInfo = [req.body.org_id, req.body.name, req.body.description, req.body.start, req.body.end, req.body.reqs, req.body.address];
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /api/orgs/profile/create route', error);
            res.sendStatus(501)
        })
})

router.post('/images/:id', rejectUnauthenticated, (req, res) => {
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

// run every 30 minutes
// loop through event start times, if event start time - 1 day is >= the current date then...
// log something for now
// eventually call the gmail api to send an email to the owner of event
const job = new CronJob('0 */30 * * * *', function () {
    const d = new Date();
    // return all events in a 30 minute period 24 hours before the event_start date/time
    const queryText = `SELECT events.id as event_id, events."name" as event_name, event_start, events.address as event_address, 
                        orgs."name" as org_name, "user".email as owner_email FROM events 
                        JOIN orgs ON events.org_id=orgs.id 
                        JOIN "user" ON orgs.admin_id="user".id 
                        WHERE event_start < NOW() + interval '1 day' + interval '6 hours' + '15 minutes' 
                        AND event_start > NOW() + interval '1 day' + interval '5 hours' + '45 minutes'`;
    pool.query(queryText)
        .then((result) => {
            const events = result.rows
            console.log(events);

            events.forEach((event) => {
                // another query to grab all volunteers for an event
                const queryTextUsers = `SELECT "user".username as "name", "user".email FROM users_events 
                                            JOIN "user" ON users_events.user_id="user"."id" 
                                            WHERE event_id=$1`
                pool.query(queryTextUsers, [event.event_id])
                    .then( (result) => {
                        // concat all volunteer info in string with html tags for email
                        let volunteers = ''
                        result.rows.forEach( (volunteer) => 
                            volunteers += `<li>Name: ${volunteer.name}<br/>Email: ${volunteer.email}</li><br/><br/>`
                        )
                        console.log(result.rows);
                        
                        // sendgrid api here to send email with org, event, and volunteer info
                        const message = {
                            to: 'pete9372@umn.edu',
                            from: 'kai.m.peterson@gmail.com',
                            subject: `Volunteers for Upcoming Event: ${event.event_name}`,
                            text: `organization: ${event.org_name}, name: ${event.event_name}, address: ${event.event_address}, volunteers: ${volunteers}`,
                            html: `<p><b>Organization:</b> ${event.org_name}<br/><br/>
                                        <b>Event:</b> ${event.event_name}<br/><br/>
                                        <b>Address:</b> ${event.event_address}<br/><br/>
                                        <b>Volunteers Signed-up:</b><br/><br/><ul>${volunteers}</ul></p>`,
                        }
                        sgMail.send(message)
                    })
            })
        })
});
console.log('After job instantiation');
job.start();


module.exports = router;