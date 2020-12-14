const express = require('express');
const app = express();
const dados = require('./db.json'); 
const router = express.Router();
const bodyParser = require('body-parser');
let cors = require('cors');


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./Controllers/UserControl')(app);
require('./Controllers/PlaylistControl')(app);

app.listen(3000, () => {
    console.log('backend rodando...')
})