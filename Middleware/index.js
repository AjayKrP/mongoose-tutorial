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

// Create student schema with only one field Student name of type String
let StudentSchema = new mongoose.Schema({
    name: String,
    email: {type: String, require: true, lowercase: true},
    password: String
})

StudentSchema.pre('save', function (next) {
    let student = this;

    if (!student.isModified('password' && !student.password)) {
        next()
    }
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            next(err)
        }
        bcrypt.hash(student.password, salt, function(err, hash) {
            // Store hash in your password DB.
            if (err) {
                next(err)
            }
            student.password = hash;
            next()
        });
    });

})

StudentSchema.post('save', function (doc) {
    console.log('document id is %s', doc._id)
})



StudentSchema.pre('find', function (next) {
    console.log('in pre find hook')
    next();
})

StudentSchema.post('find', function (doc) {
    console.log('length of the doc is %d', doc.length)
})



StudentSchema.pre('remove', {query: false, document: true}, function (next) {
    // do the operation
})

// Create & compile model
let Student = mongoose.model('Student', StudentSchema);

// Create student document
let student = new Student({
    name: "Sudo",
    email: "asdasd@xx.com",
    password: "234234"
})

/*

// Now finally save document to database
student.save(function (err, record) {
    if (err)
        throw err;
    console.log(record)
})*/


Student.find({name: "Ajay"}, function (err, result) {
    if (err) throw err;
    console.log(result)
})
