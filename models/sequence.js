const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    name : String,
    seq : Number
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;