"use strict";
const form = document.querySelector('form');
const input1 = document.querySelector('#item');
const input2 = document.querySelector('#quantity');
const table = document.querySelector('#table');
const buttonsave = document.querySelector('#save');
const buttonmodify = document.querySelector('#modify');
const buttonremove = document.querySelector('#remove');
const buttonclear = document.querySelector('#clear');
var items;
var data;
setMainData();

function setMainData(){
    items =JSON.parse(localStorage.getItem('items'))?JSON.parse(localStorage.getItem('items')):[];
     data= JSON.parse(localStorage.getItem('items'))?JSON.parse(localStorage.getItem('items')):[];
    
}
//create row and append to table
const createrow = (name,value) =>{
    var table = document.getElementById("table");
    var row = table.insertRow();
    var  NameCell =row.insertCell(0);
    var ValueCell =row.insertCell(1);
    NameCell.innerHTML=name;
    ValueCell.innerHTML=value;
}

for (var i = 0; i < data.length; i++) {
    createrow(data[i].name,data[i].value);
 }

// submit form Event
buttonsave.addEventListener('click',function(e){
    e.preventDefault();
    // add to localStorage
    var n1= input1.value;
    var n2 =input2.value;
    var itemObj = {name:n1,value:n2 };
    items.push(itemObj);
    localStorage.setItem('items',JSON.stringify(items));
     // add to table
    createrow(input1.value,input2.value);
    input1.value='';
    input2.value='';
    
});
//modify item
buttonmodify.addEventListener('click',function(e){
    e.preventDefault();
    setMainData();
    var n1= input1.value;
    var n2 =input2.value;
    for (var i = 0; i < data.length; i++) {
        if(data[i].name == n1) {
            console.log(data[i].value);
            var x = document.getElementById("table").rows[i+1].cells;
            x[1].innerHTML = n2;
            input1.value='';
            input2.value='';
            data[i].value=n2;
        }
      }
       items=JSON.stringify(data);
      localStorage.setItem('items',items);

});
// remove item
buttonremove.addEventListener('click',function(e){
    e.preventDefault();
    var n1= input1.value;
    for (var i = 0; i < data.length; i++) {
       if(data[i].name ==n1) {
           table.deleteRow(i+1);
           input1.value='';
           items.splice(i,1);
           localStorage.setItem('items',JSON.stringify(items));
        }
    }    
});


//clear data 
buttonclear.addEventListener('click',function(e){
    e.preventDefault();
    localStorage.clear();
    table.innerHTML='<tr><th>Name</th><th>Value</th></tr>'
}); 


