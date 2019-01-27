const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Formb } = require('../models/formb');

// => localhost:3003/formb/
router.get('/', (req, res) => {
    Formb.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving FormB :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Formb.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving FormB :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Formb({
        name: req.body.name,
        matricNo: req.body.matricNo,
        department: req.body.department,
        company: req.body.company,
        address: req.body.address,
        allowances: req.body.allowances,
        workdone: req.body.workdone,
        weeks: req.body.weeks,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in FormB Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        matricNo: req.body.matricNo,
        department: req.body.department,
        company: req.body.company,
        address: req.body.address,
        allowances: req.body.allowances,
        workdone: req.body.workdone,
        weeks: req.body.weeks,
    };
    Formb.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in FormB Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Formb.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in FormB Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;