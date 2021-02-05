const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const uri =
    'mongodb+srv://dtrUser:dtrdtrdtr@cluster0.an88e.mongodb.net/dtr-demo?retryWrites=true&w=majority';

mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    () => console.log('connected')
);

app.use(cors());
app.use(express.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
const options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));

app.get('/', require('./routes').index);
app.post('/', require('./routes').indexPost);
app.listen(3001, () => {
    console.log('listening at 3001');
});
