// var arr = []

// function addtodo(){
//     arr.push(input.value);
//     input.value = ``;
//     randertodo()
// }

// function deletetodo(index){
//     arr.splice(index , 1);
//     randertodo();
// }

// function edittodo(index){

//     var editvalue = prompt("Enter the Edit");
//     arr[index] = editvalue;
//     randertodo();
// }

// function randertodo(){
//     var input = document.querySelector(`#input`);
//     var ol = document.querySelector(`#ordered_list`);

//     ol.innerHTML = ``;

//     for (var i = 0; i < arr.length; i++){

//         ol.innerHTML += `<li>${arr[i]}
//         <button onclick="deletetodo(${i})">Delete</button>
//         <button onclick="edittodo(${i})">Edit</button>
//         </li>`;
//     }
// }


function submit(){

    let todoText = document.getElementById('text').value;
    let todoResult = document.getElementById('Result');
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    let text = document.createTextNode(todoText);
    let editButton = document.createElement('button');
    let edit = document.createTextNode('Edit');
    let deleteButton = document.createElement('button');
    let del = document.createTextNode('Delete');

    editButton.addEventListener('click' , (Event) => {

        let editValue = prompt('Edit your Value');
        li.innerHTML = editValue
        
    });

    deleteButton.addEventListener('click' , (Event) => {

        ul.remove(li);
        
    });

    deleteButton.appendChild(del);
    editButton.appendChild(edit);
    li.appendChild(text);
    ul.append(li , editButton , deleteButton);
    todoResult.appendChild(ul);

}