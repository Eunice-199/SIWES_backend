const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Supervisor, MatNo } = require('../models/supervisor');

// => localhost:3003/superviosr/
router.get('/', (req, res) => {
    Supervisor.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving supervisor :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/', (req, res) => {
    MatNo.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving matric number :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Supervisor.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Supervisor :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Supervisor({
        title: req.body.title,
        name: req.body.name,
        studMatNo: req.body.studMatNo,
        phoneNo: req.body.phoneNo,
        comments: req.body.comments,
        location: req.body.location,

    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Supervisor Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/supervised', (req, res) => {
    var emp = new MatNo({
        studMatNo: req.body.studMatNo,

    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Matric Number Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        studMatNo: req.body.studMatNo,
    };
    MatNo.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Matric Number Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        title: req.body.title,
        name: req.body.name,
        studMatNo: req.body.studMatNo,
        phoneNo: req.body.phoneNo,
        comments: req.body.comments,
        location: req.body.location,
    };
    Supervisor.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Supervisor Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Supervisor.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Supervisor Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;