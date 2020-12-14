const mongoose = require ('../Database');

const PlaylistSchema = new mongoose.Schema({

    name:{
      type:String,
      require : true  
    },
    capa: {
        type:String,
        required: true 
    },
    descricao : {
        type:String,
        required: true,
    },
    musicas : {
        type: Array
    },
});

const Playlist = mongoose.model('playlists',PlaylistSchema);

module.exports = Playlist;