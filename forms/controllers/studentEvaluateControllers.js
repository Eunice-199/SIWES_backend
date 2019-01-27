const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { StudentEvaluate } = require('../models/studentEvaluate');

// => localhost:3003/studEva/
router.get('/', (req, res) => {
    StudentEvaluate.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving StudentEvaluation :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    StudentEvaluate.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving StudentEvaluation :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new StudentEvaluate({
        matricNo: req.body.matricNo,
        score: req.body.score,
        grade: req.body.grade,

    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in StudentEvaluation Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        matricNo: req.body.matricNo,
        score: req.body.score,
        grade: req.body.grade,
    };
    StudentEvaluate.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in StudentEvaluation Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    StudentEvaluate.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in StudentEvaluation Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;