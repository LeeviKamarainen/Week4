const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let dietSchema = new Schema({
    name: String,

});

module.exports = mongoose.model("category", dietSchema);