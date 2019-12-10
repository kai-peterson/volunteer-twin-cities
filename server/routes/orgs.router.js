const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// require Cron to check every 30min for event email notificaions
const CronJob = require('cron').CronJob;

// require SendGrid mail to send emails
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// get all Organizations for main list view
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

// get all pending Organizations awaiting approval for admin table
router.get('/pending', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM pending_orgs WHERE status='pending' ORDER BY id`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error in /api/orgs route', error);
            res.sendStatus(501)
        })
});

// get details for a single pending organization
router.get('/pending/details/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM pending_orgs WHERE id=$1`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            console.log('successful details GET', result);
            
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error in /api/orgs route', error);
            res.sendStatus(501)
        })
});

// update status (upon approval/denial) of a single pending organization
router.put('/pending/details/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE pending_orgs SET status=$1 WHERE id=$2`;
    pool.query(queryText, [req.body.status, req.params.id])
        .then((result) => {
            console.log('successful pending details PUT');
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log('error in /api/orgs route', error);
            res.sendStatus(501)
        })
});

// get all Orgs owned by user for manage orgs list
router.get('/user', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT id, name, type, intro FROM orgs WHERE admin_id=$1 ORDER BY id`;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('error in /api/orgs/user route', error);
            res.sendStatus(501)
        })
});

// get all details for a single Organization
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

// get all events for a single Organization
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

// get all events that a user has signed up for
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

// get all users that have signed up for an event
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

// delete a single event (from junction table and events table)
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

// get all details for a single event
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

// update event details
router.put('/event/update/:event_id', rejectUnauthenticated, (req, res) => {
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

// post user/event into junction table when user signs up
router.post('/event/signup/:event_id', rejectUnauthenticated, (req, res) => {
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

// update a single organization's details
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

// get all images for an organization for the carousel 
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

// add an approved org into the orgs table
router.post('/profile/create/org', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO orgs ("admin_id", "name", "type", "intro", "image", "mission", "message", "address") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    const queryInfo = [req.body.admin_id, req.body.name, req.body.type, req.body.intro, req.body.image, req.body.mission, req.body.message, req.body.address];
    console.log('in create org route', queryInfo);
    
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /api/orgs/profile/create/org route', error);
            res.sendStatus(501)
        })
})

// add an org into the pending table until approved by admin
router.post('/profile/create/pending/org', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO pending_orgs ("admin_id", "name", "type", "intro", "image", "mission", "message", "address") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    const queryInfo = [Number(req.user.id), req.body.name, req.body.type, req.body.intro, req.body.image, req.body.mission, req.body.message, req.body.address];
    pool.query(queryText, queryInfo)
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error in /api/orgs/profile/create/pending/org route', error);
            res.sendStatus(501)
        })
})

// add an event under a single org
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

// add an image for a single org to be used in carousel
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
// loop through event start times, if event start time - 1 day is <= the current date then...
// log something for now
// eventually call the gmail api to send an email to the owner of event
const job = new CronJob('0 */30 * * * *', function () {
    // return all events in a 30 minute period 24 hours before the event_start date/time
    const queryText = `SELECT events.id as event_id, events."name" as event_name, event_start, events.address as event_address, 
                        orgs."name" as org_name, "user".email as owner_email FROM events 
                        JOIN orgs ON events.org_id=orgs.id 
                        JOIN "user" ON orgs.admin_id="user".id 
                        WHERE event_start <= NOW() + interval '1 day' + interval '6 hours' + '15 minutes' 
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
                const owner_email = event.owner_email;
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
                            to: owner_email,
                            from: 'kai.m.peterson@gmail.com',
                            subject: `Volunteers for Upcoming Event: ${event.event_name}`,
                            text: `organization: ${event.org_name}, name: ${event.event_name}, address: ${event.event_address}, volunteers: ${volunteers}`,
                            html: `<p><b>Organization:</b> ${event.org_name}<br/><br/>
                                        <b>Event:</b> ${event.event_name}<br/><br/>
                                        <b>Event address:</b> ${event.event_address}<br/><br/>
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