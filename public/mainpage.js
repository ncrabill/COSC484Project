
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
var dept = ['AADS', 'ACCT', 'ACSD','COSC','GEOG', 'MATH']



//app.use(bodyParser.urlencoded({extended: false}))
//const deptSchema = {
//    Name: String,
//    Classes: [String]
//}
//const Dept = mongoose.model("Departments", deptSchema);
function ttt(){
    document.getElementById("test").innerHTML = "help";
}

function autocomplete(input){
    if(input == ''){
        return[]
    }    
    var reg = new RegExp(input)
    return dept.filter(function(term){
        if(term.ignorecase.match(ref)){
            return term
        }
    })
}

function showResults(val){
    res = document.getElementById('result')
    res.innerHTML = ''
    let list = ''
    let terms = autocomplete(val)
    for (i=0; i<terms.length; i++){
        list += '<li>' + terms[i] + '</li>'
    }
    res.innerHTML = '<ul>' + list + '</ul>'
 }

 //mongoose.connect('mongodb+srv://finalproj484:IraniIsTheGoat@cluster0.od6wa.mongodb.net/finalproj484?retryWrites=true&w=majority', {
 //   useUnifiedTopology: true,
 //   useNewUrlParser: true,
//}).then(() => {
//    app.listen(8000, () => {
//        console.log("Server is running on Port 8000")
//    })
//})

