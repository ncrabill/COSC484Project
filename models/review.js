const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    oneWord: String,
    grade: String, 
    crating: Number,
    professor: String,
    prating: Number,
    summary: String
})

module.exports = mongoose.model('reviews', reviewSchema)