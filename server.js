require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
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

app.get("/", checkNotAuthenticated, (req, res) => {
    res.render("index");
})

app.get("/authorized", checkAuthenticated, (req, res) => {
    res.render("authorized", { name: req.user.name }); 
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

mongoose.connect('mongodb+srv://finalproj484:IraniIsTheGoat@cluster0.od6wa.mongodb.net/finalproj484?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running on Port 8000")
    })
})