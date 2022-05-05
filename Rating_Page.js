
const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))

 const reviewSchema = {
    oneWord: String,
    grade: String, 
    crating: Number,
    professor: String,
    prating: Number,
    summary: String
}
const Review = mongoose.model("reviews", reviewSchema);
app.use(express.static("public"))
app.get("/", function(req,res){
    res.sendFile(__dirname + "/Rating_Page.html");
})
app.post("/", function(req, res){
    let review = new Review ({
        oneWord: req.body.OneWordRev,
        grade: req.body.LetterGrade, 
        crating: req.body.NumRating,
        professor:req.body.ProfTaken,
        prating: req.body.ProfRating,
        summary: req.body.Summary
    });
    review.save();
});
mongoose.connect('mongodb+srv://jherre9:484test@cluster0.eve1b.mongodb.net/CourseConnect?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    app.listen(8000, () => {
        console.log("Server is running on Port 8000")
    })
})

