
var dept = ['AADS', 'ACCT', 'ACSD','COSC','GEOG', 'MATH']

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

