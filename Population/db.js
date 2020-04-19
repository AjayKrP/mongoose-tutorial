const mongoose = require('mongoose');


// connect with local database
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// syntax to connect hosted database
//mongoose.connect('mongodb://USERNAME:PASSWORD@HOST::PORT/DATABASE_NAME')

// Create connection
const db = mongoose.connection;
// check error condition
db.on('error', console.error.bind(console, 'Connection error'));
// open connection and finally connect
db.on('open', function () {
    console.log('connected');
})
