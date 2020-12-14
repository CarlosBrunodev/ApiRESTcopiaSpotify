const express = require('express');
const router = express.Router();
const { db } = require('../Models/User');
let ObjectId = require('mongodb').ObjectID;

const dados = require('../db.json');
const User = require('../Models/User');


router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ err: 'User already exists' });

        const user = await User.create(req.body);
        return res.send({ user });

    } catch (err) {
        return res.status(400).send({ err: 'Resgistration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ err: 'User not found' });

    if ((password != user.password))
        return res.status(400).send({ err: 'Invalid password' });

    res.send({ user });

});

router.get('/edit/:id', async (req, res) => {
    let id = JSON.parse(req.params.id)

    db.collection("users").findOne({ _id: ObjectId(id) });
    db.collection("users").find({ _id: ObjectId(id) }).toArray((err, results) => {
        res.send(results);
    })
});

router.post('/edit/:id', function (req, res) {
    let id = JSON.parse(req.params.id);

    User.findById({ _id: ObjectId(id) }, function (err, use) {
        if (err) {
            console.log('error');
        }
        use.name = req.body.name;
        use.email = req.body.email
        use.password = req.body.password;
        use.save();
        res.send(use);
    })

});

router.get('/usuario', async (req, res) => {

    db.collection("users").find().toArray((err, results) => {
        res.send(results);
    })
});


router.get('/usuario/:id', (req, res) => {
    id = (req.params.id)
    const user = dados.usuario.find((p) => p.id == id)
    //console.log(play)
    res.send(user)
});


module.exports = app => app.use('/user', router);
