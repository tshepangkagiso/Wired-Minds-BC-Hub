const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    studentNumber: { type: Number, required: true },
    qualificationName: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);