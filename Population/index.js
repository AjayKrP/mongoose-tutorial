const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// connect with local database
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// syntax to connect hosted databse
//mongoose.connect('mongodb://USERNAME:PASSWORD@HOST::PORT/DATABASE_NAME')

// Create connection
const db = mongoose.connection;
// check error condition
db.on('error', console.error.bind(console, 'Connection error'));
// open connection and finally connect
db.on('open', function () {
    console.log('connected');
})



let AddressSchema = new mongoose.Schema ({
    houseNumber: String,
    city: String,
    state: String,
    country: String
})

// Create student schema with only one field Student name of type String
let StudentSchema = new mongoose.Schema({
    name: String,
    email: {type: String, require: true, lowercase: true},
    password: String,
    address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'}
})

// Create & compile model
let Address = mongoose.model('Address', AddressSchema);

let Student = mongoose.model('Student', StudentSchema);

let address = new Address({
    houseNumber: '234',
    city: "Pune",
    state: "MH",
    country: "IN"
})


/*// Now finally save document to database
address.save(function (err, record) {
    if (err)
        throw err;
    // Create student document
    let student = new Student({
        name: "Sudo",
        email: "asdasd@xx.com",
        password: "234234",
        address: record._id
    })
    student.save(function (err, stud) {
        if (err) throw err;
        console.log(stud)
    })
    //console.log(record)
})*/

/*User.
findOne({ name: 'Val' }).
populate({
    path: 'friends',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'friends' }
});*/

Student.findOne({_id: '5e9bbd2d8b4e41181d32a6a8'})
    .populate({
        path: 'address',
        match: {city: {$eq: 'Pune'}},
        options: {limit: 2}
    })
    .exec(function (err, record) {
    if (err) throw err;
    console.log(record);
});
