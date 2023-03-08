const router = require('express').Router();

const { query } = require('./database');

router.get('/events', (req, res) => {

    query('SELECT * FROM Events')
        .then(results => res.json(results))
        .catch((err) => {
            console.log(err);
            res.json([])
        })

})

router.get('/events/:id', (req, res) => {

    query(
        `
        SELECT * FROM Events
        WHERE id = '${req.params.id}'
        `
    )
        .then((record) => res.json(record))
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: `Failed to retrieve the event with id ${req.params.id}` })
        })

})

router.post('/events', (req, res) => {

    const { label, dateStart, dateEnd, allDay, description, status, backgroundColor } = req.body;
    console.log(req.body);
    query(`
        INSERT INTO Events (label, dateStart, dateEnd, allDay, description, status, backgroundColor)
        VALUES (${label ? `'${label}'` : null}, '${dateStart}', '${dateEnd}', ${allDay}, '${description || ''}', '${status || ''}', '${backgroundColor || ''}');
        `
    )
        .then((result) => res.json({ id: result.insertId, label, dateStart, dateEnd, allDay, description, status, backgroundColor }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: "Failed to add an event" })
        })

})

router.put('/events', (req, res) => {

    const { id, label, dateStart, dateEnd, allDay, description, status, backgroundColor } = req.body;

    query(
        `
        UPDATE Events
            SET 
            label = ${label ? `'${label}'` : null}, 
            dateStart = '${dateStart}', 
            dateEnd = '${dateEnd}',
            allDay = ${allDay ? true : false},
            description = '${description || ''}', 
            status = '${status || ''}',
            backgroundColor = '${backgroundColor || ''}'
        WHERE id = '${id}'
        `
    )
        .then(() => res.json({ id, label, dateStart, dateEnd, allDay, description, status, backgroundColor }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: `Failed to update the event with id ${id}` })
        })

})

router.delete('/events/:id', (req, res) => {

    query(
        `
        DELETE FROM Events
        WHERE id = '${req.params.id}'
        `
    )
        .then(() => res.send(true))
        .catch((err) => {
            console.log(err);
            res.status(400).json({ error: `Failed to delete the event with id ${req.params.id}` })
        })

})

module.exports = router