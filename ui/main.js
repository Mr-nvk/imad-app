var button=document.getElementById('counter');
button.onclick = function () {
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readystate === XMLHttpRequest.Done) {
                if(request.status === 200){
                    var counter = request.responseText;
                    var span = document.getElemnetById('count')
                    span.innerHTML = counter.toString();
                }
        }
    }
    request.open('GET','http://naveenkumawat19952.imad.hasura-app.io/counter',true);
    request.send(null);
};

var nameInput = document.getElemnetById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    
    var names = ['name1','name2','name3','name4'];
    var list = '';
    for(var i=0; i<names.length; i++){
        list += '<li>' + names[i] + '</li>'; 
    }
    var u1 = document.getElementById('namelist');
    u1.innerHTML = list;
};