const mongopath = "mongodb+srv://jherre9:484test@cluster0.eve1b.mongodb.net/CourseConnect?retryWrites=true&w=majority"
const mongoose = require('mongoose')
module.exports = async () => {
    await mongoose.connect(mongopath,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}
//