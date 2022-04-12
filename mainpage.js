//const res = require("express/lib/response")

var dept = ['AADS', 'ACCT', 'ACSD','COSC','GEOG', 'MATH']

function autocomplete(input){
    if(input == ''){
        return[]
    }    
    var reg = new RegExp(input)
    return dept.filter(function(term){
        if(term.match(ref)){
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


// function autocomplete(inp, dept){
//     var currentFocus;
//     inp.addListener("input", function(e){
//         var a, b, i, val = this.value;

//         closeAllLists();
//         if(!val){return false}
//         currentFocus = -1;

//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");

//         this.parentNode.appendChild(a);

//         for(i = 0; i < dept.length; i++){
//             if (dept[i].substr(0, val.length).toUpperCase() == val.toUpperCase()){
//                 b = document.createElement("DIV")
//                 b.innerHTML += "<strong>" + dept[i].substr(0, val.length) + "</strong>"

//                 b.innerHTML += "<input type='hidden' value='" + dept[i] + "'>" 

//                     b.addEventListener("click", function(e){
//                         inp.value = this.getElementsByTagName("deptField")[0].value
//                         closeAllLists()
//                     })
//                 a.appendChild(b)
//             }
//         }
//     })

//     inp.addEventListener("keydown", function(e){
//         var x= document.getElementById(this.id + "autocomplete-list")
//         if (x) x= x.getElementsByTagName("div")
//         if(e.keyCode == 40){            //down key
//             currentFocus++
//             addActive(x)
//         }
//         else if (e.keyCode == 38){      //up key
//             currentFocus--
//             addActive(x)
//         }
//         else if(e.keyCode == 13){       //enter key
//             e.preventDefault()
//             if(currentFocus > -1){
//                 if(x) x[currentFocus].click()
//             }
//         }
//     })
//     function addActive(x){
//         if(!x) return false

//         if(currentFocus >= x.length) currentFocus = 0
//         if (currentFocus < 0) currentFocus = (x.length -1)

//         x[currentFocus].classList.add("autocomplete-active")
//     }
//     function removeActive(x){
//         for (var i = 0; i < x.length; i++){
//             x[i].classList.remove("autocomplete-active")
//         }
//     }
//     function closeAllLists(elmnt){
//         var x = document.getElementsByClassName("autocomplete-items")
//         for( var i = 0; i < x.length; i++){
//             if(elmnt != x[i] && elmnt != inp){
//                 x[i].parentNode.removeChild(x[i])
//             }
//         }
//     }
//     document.addEventListener("click", function(e){
//         closeAllLists(e.target)
//     })
// }