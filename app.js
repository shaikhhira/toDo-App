//calling data from firebase 

firebase.database().ref('todos').on('child_added',function(data){
    //create li and its textnode button

var li=document.createElement("li");
var liText=document.createTextNode(data.val().value);


var imgEditBtn=document.createElement("img");
imgEditBtn.setAttribute("id",data.val().key);
imgEditBtn.setAttribute("src","images/edit.png");
imgEditBtn.setAttribute("onClick","editItem(this)");

var imgDelBtn=document.createElement("img");
imgDelBtn.setAttribute("id",data.val().key);
imgDelBtn.setAttribute("src","images/trash.png");
imgDelBtn.setAttribute("onClick","delItem(this)");

//take value of textnode inside li

li.appendChild(liText);
li.appendChild(imgEditBtn);
li.appendChild(imgDelBtn);

//take value of li inside ul
list.appendChild(li);

input.value="";
})

    //get elements
       var input= document.getElementById("input");
       var list=document.getElementById("list");

    //add button
function addBtn(){
    if(input.value==""){
        alert("kindly fill value first");
    }
    else{

        // make key
    var database=firebase.database().ref('todos'); 
    var key=database.push().key;

    var todo={
        value:input.value,
        key:key
    }
    database.child(key).set(todo);
    
    }
}
function editItem(e){
    var edInput=prompt("enter",e.parentNode.firstChild.nodeValue);
    var editTodo={
        value:edInput,
        key:e.id
    }
    firebase.database().ref('todos').child(e.id).set(editTodo);
    e.parentNode.firstChild.nodeValue=edInput;
}
function delItem(e){
    
    firebase.database().ref('todos').child(e.id).remove();
    e.parentNode.remove();
}
function delBtn(){
    firebase.database().ref('todos').remove();
    list.innerHTML="";
}