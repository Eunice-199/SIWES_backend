const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Forma } = require('../models/forma');

// => localhost:3002/forma/
router.get('/', (req, res) => {
    Forma.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in Retriving FormA :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Forma.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving FormA :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Forma({
        name: req.body.name,
        matricNo: req.body.matricNo,
        position: req.body.position,
        company: req.body.company,
        address: req.body.address,
        telephone: req.body.telephone,
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in FormA Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        matricNo: req.body.matricNo,
        position: req.body.position,
        company: req.body.company,
        address: req.body.address,
        telephone: req.body.telephone,
    };
    Forma.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in FormA Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Forma.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in FormA Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;