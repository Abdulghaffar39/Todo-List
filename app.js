var input = document.querySelector(`#input`);
var ol = document.querySelector(`#ordered_list`);

var arr = []



function addtodo(){
    arr.push(input.value);
    input.value = ``;
    randertodo()
}



function deletetodo(index){
    arr.splice(index , 1);
    randertodo();
}

function edittodo(index){
    
    var editvalue = prompt("Enter the Edit");
    arr[index] = editvalue;
    randertodo();
}



function randertodo(){
    
    ol.innerHTML = ``;
    
    for (var i = 0; i < arr.length; i++){
        
        ol.innerHTML += `<li>${arr[i]}
        <button onclick="deletetodo(${i})">Delete</button>
        <button onclick="edittodo(${i})">Edit</button>
        </li>`;
    }
}
