const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('./db')

let StudentAddress = new mongoose.Schema({
    houseNumber: Number,
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
let Student = mongoose.model('Student', StudentSchema);

let Address = mongoose.model('Address', StudentAddress);




let address = new Address({
    houseNumber: 123,
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India'
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
        if (err)
            throw err;
        console.log(stud)
    })
})*/



// Student populations
Student.findOne({_id: '5e9c133325415a50b80cea21'})
    .populate({
        path: 'address',
        match: {houseNumber: {$gte: 100}},
        options: {limit: 1}
    })
    .exec(function (err, data) {
        if (err) throw err;
        console.log(data)
    })


//TODO:// multiple population
/*Student.findOne({_id: '5e9c133325415a50b80cea21'})
    .populate('address')
    .populate('parent')
    .exec(function (err, data) {
        if (err) throw err;
        console.log(data)
    })*/

//TODO:// Two level population (nested population)
/*
Student.findOne({_id: '5e9c133325415a50b80cea21'})
.populate({
    path: 'friend',
    populate: {path: 'friend'}
})
.exec(function (err, data) {
    if (err) throw err;
    console.log(data)
})*/
