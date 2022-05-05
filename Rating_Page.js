
const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const reviewSchema = require('./models/review')
const mongo = require('./mongo')

const connectToMongoDB = async () => {
    await mongo().then(async(mongoose) =>{
        try {
            console.log('Connected to mongo db!')
            const review = {
                oneWord: 'Great',
                grade: "A", 
                crating: 10,
                professor: "Jal",
                prating: 10,
                summary: "The class was super fun and awesome"
            }

            await new reviewSchema(review).save()
        }finally {
            mongoose.connection.close()
        }
    })
}
connectToMongoDB()