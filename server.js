require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const bodyParser = require("body-parser");
const {
    checkAuthenticated,
    checkNotAuthenticated,
} = require("./middlewares/auth")

const app = express()

const initializePassport = require("./passport-config");
initializePassport(
    passport,
    async (email) => {
        const userFound = await User.findOne({ email })
        return userFound;
    },
    async (id) => {
        const userFound = await User.findOne({ _id: id })
        return userFound;
    }
)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
    secret: 'abc123',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))
app.use(express.static("public"))

const deptSchema = {
    Name: String,
    Classes: [String]
}

const Dept = mongoose.model("departments", deptSchema);


app.get('/Rating_PageENGL190',(req,res) => {
    Class.find({Dept:'ENGL', Num :190}, function(err,data){
        var revs = data[0].Reviews
        res.render('Rating_Page', {
            datafound:revs
        })
    })    
})
app.get('/Rating_PageENGL290',(req,res) => {
    Class.find({Dept:'ENGL', Num :290}, function(err,data){
        var revs = data[0].Reviews
        res.render('Rating_Page', {
            datafound:revs
        })
    })    
})
app.get('/Rating_PageCOSC490',(req,res) => {
    Class.find({Dept:'COSC', Num :490}, function(err,data){
        var revs = data[0].Reviews
        res.render('Rating_Page', {
            datafound:revs
        })
    })    
})

//review stuff
app.use(bodyParser.urlencoded({extended: true}))
const reviewSchema = mongoose.Schema ({
    oneWord: String,
    grade: String,
    crating: Number,
    professor: String,
    prating: Number,
    summary: String
})
const Review = mongoose.model("reviews", reviewSchema);
const classSchema  = mongoose.Schema({
    Dept: String,
    Num : Number,
    Teachers : [String] ,
    Reviews : [reviewSchema]
})
const Class = mongoose.model("classes", classSchema)

function choose(depart, classOp) {
    DeptOption = depart
    classOption = classOp
}

Class.find({Dept:'COSC', Num :'459'},function(error, data){
    if(error){
        console.log("error")
    }
    else{
        
        console.log(data[0].Reviews)
    }
})

//review stuff
app.get("/", checkNotAuthenticated, (req, res) => {
    Dept.find({}, function (err, depts) {
        res.render('index', {
            deptList: depts
        })
    })
})
app.get('/index', (req, res) => {
    Dept.find({}, function (err, depts) {
        res.render('index', {
            deptList: depts
        })
    })
})


app.get("/authorized", checkAuthenticated, (req, res) => {
    Dept.find({}, function (err, depts) {
        res.render('authorized', {
            name: req.user.name,
            deptList: depts
        })
    })
})

/*
app.get("/", checkAuthenticated, (req, res) => {
    res.render("index", { name: req.user.name });
})
*/
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register")
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login")
})

app.get('/Rating_Page',(req,res) => {
    Class.find({Dept:'COSC', Num :484}, function(err,data){
        var revs = data[0].Reviews
        res.render('Rating_Page', {
            datafound:revs
            
        })
    })
})

app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/authorized",
    failureRedirect: "/login",
    failureFlash: true,
}))
app.post("/register", checkNotAuthenticated, async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound) {
        req.flash("error", "User with that email already exists")
        res.redirect("/register")
    } else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            })
            await user.save()
            res.redirect("/login")
        } catch (error) {
            console.log(error)
            res.redirect("/register")
        }
    }
})
app.post("/", function (req, res) {
    let review = new Review({
        oneWord: req.body.OneWordRev,
        grade: req.body.LetterGrade,
        crating: req.body.NumRating,
        professor: req.body.ProfTaken,
        prating: req.body.ProfRating,
        summary: req.body.Summary
    });
    review.save();
    res.redirect("/Rating_Page");
});

mongoose.connect('mongodb+srv://finalproj484:IraniIsTheGoat@cluster0.od6wa.mongodb.net/finalproj484?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running on Port 8000")
    })
})