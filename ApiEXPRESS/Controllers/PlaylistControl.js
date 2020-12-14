const express = require('express');
const router = express.Router();
let ObjectId = require('mongodb').ObjectID;

const { db } = require('../Models/Playlists');
const Playlist = require('../Models/Playlists')


router.post('/register', async (req, res) => {
    //  const { name } = req.body;
    const playlists = await Playlist.create(req.body);
    return res.send({ playlists });
});

router.get('/edit/:id', async (req, res) => {
    let id = JSON.parse(req.params.id)
    db.collection("playlists").findOne({ _id: Object(id) });
    db.collection("playlists").find({ _id: Object(id) }).toArray((err, results) => {
        res.send(results);
    })
});

router.post('/edit/:id', async (req, res) => {
    let id = JSON.parse(req.params.id);

    Playlist.findById({ _id: Object(id) }, function (err, play) {
        if (err) {
            console.log('error');
        }
        play.name = req.body.name;
        play.capa = req.body.capa;
        play.descricao = req.body.descricao;
        play.musicas = req.body.musicas;
        play.save();
        res.send(play)
    })
});

router.get('/playlist', async (req, res) => {
    db.collection("playlists").find().toArray((err, results) => {
        res.send(results);
    })

});

router.get('/playlist/:id', (req, res) => {
    let id = (req.params.id)
    db.collection("playlists").find({ "_id": ObjectId(id) }, { musicas: "$true" }).toArray((err, results) => {
        res.send(results);
    })
});

module.exports = app => app.use('/play', router);

