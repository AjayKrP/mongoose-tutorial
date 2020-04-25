const mongoose = require('mongoose');
require('./db')
const Schema = mongoose.Schema;

// Create student schema with only one field Student name of type String
let StudentSchema = new Schema({
    name: String,
    age: String,
    standard: String,
    grade: String,
    _id: String,
})

// Instance methods
StudentSchema.methods.studentDetails = function() {
    return "Name: " + this.name + " Age: "+this.age
}

// Statics
StudentSchema.statics.findByName = function(name) {
    // Model.find()
    return this.find({name: new RegExp(name, 'i')})
}

// Query Helpers
StudentSchema.query.byName = function(name) {
    // this === query
    return this.where({name: new RegExp(name, 'i')})
}

// Virtuals

StudentSchema.virtual('nameAge').get(function () {
    return this.name + " " + this.age
}).set(function (v) {
    this.name = v.substr(0, v.indexOf(' '))
    this.age = v.substr(v.indexOf(' ')+1, v.length)
})

// Create & compile model
let Student = mongoose.model('Student', StudentSchema);

let student1 = new Student({
    name: "Sudo",
    age: "12",
    standard: "7th",
    grade: 8.9
})

//student1._id = "23234234"

//console.log(student1)

//console.log(student1.studentDetails())

//console.log(Student.findByName('ajay'))

/*
console.log(Student.find().byName('ajay').exec(function (err, result) {
    if (err) throw err;
    console.log(result)
}))*/

/// console.log(student1.nameAge)

student1.nameAge = "Ajay 20"

console.log(student1)
