const mongoose = require('mongoose');
require('./db')

// Create student schema with only one field Student name of type String
let StudentSchema = new mongoose.Schema({
    name: String,
    age: String,
    standard: String,
    grade: String
})


let students = [
    {
        name: "ajay",
        age: 18,
        standard: "12th",
        grade: 8.9
    },
    {
        name: "deepak",
        age: 16,
        standard: "10th",
        grade: 9.5
    },
    {
        name: "vijay",
        age: 17,
        standard: "12th",
        grade: 9.3
    },
    {
        name: "pranav",
        age: 22,
        standard: "Graduated",
        grade: 9.0
    },
    {
        name: "kumud",
        age: 23,
        standard: "B.Com",
        grade: 9.1
    },
    {
        name: "Dharmendra",
        age: 18,
        standard: "12th",
        grade: 9.0
    }
]

// Create & compile model
let Student = mongoose.model('Student', StudentSchema);


/*Student.insertMany(students, function (err, result) {
    if (err) throw err;
    console.log(result)
})*/

/*
Student.find({
    name: /Ajay/i,
    age: {$gt: 17, $lt: 23}
})
.limit(2)
.sort({name: 1})
.select({name: 1, age: 1})
.exec(function (err, result) {
    if (err) throw err;
    console.log(result)
})*/

/*Student.find({name: /Ajay/i})
    .where('age').gt(17).lt(23)
    .limit(2)
    .sort('-name')
    .select('name age')
    .exec(function (err, doc) {
        console.log(doc)
    })*/

/*const q = Student.updateMany({}, {isDeleted: true}, function () {
    console.log('update 1')
})

q.then(() => console.log('update 2'))*/

/*
const cursor = Student.find({name: /Ajay/}).cursor();

for (let doc = cursor.next(); doc != null; doc = cursor.next()) {
    console.log(doc.then())
}
*/

const stud = Student.aggregate([
    {$match: {name: /Ajay/i}},
    {$group: {name: '$name'}}
])
