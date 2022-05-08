
const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const ejs = require('ejs');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}))
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


app.get("Rating_Page",(req,res) => {
    Review.find({}, function(err,reviews){
        res.render('Rating_Page', {
            reviewList: reviews
        })
    })
})

app.post("Rating_Page", async(req, res)=>{
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
mongoose.connect('mongodb+srv://finalproj484:IraniIsTheGoat@cluster0.od6wa.mongodb.net/finalproj484?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    app.listen(8000, () => {
        console.log("Server is running on Port 8000")
    })
})

