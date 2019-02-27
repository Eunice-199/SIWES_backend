const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Evaluate } = require('../models/evaluate');

// => localhost:3003/studEva/
router.get('/', (req, res) => {
    Evaluate.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving Evaluation :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Evaluate.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Evaluation :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Evaluate({
        matricNo: req.body.matricNo,
        dressing: req.body.dressing,
        presentation: req.body.presentation,
        audibility: req.body.audibility,
        composition: req.body.composition,
        workdone: req.body.workdone,


    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Evaluation Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        matricNo: req.body.matricNo,
        dressing: req.body.dressing,
        presentation: req.body.presentation,
        audibility: req.body.audibility,
        composition: req.body.composition,
        workdone: req.body.workdone,
    };
    Evaluate.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Evaluation Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Evaluate.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Evaluation Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;