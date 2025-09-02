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



function submit() {

    let input = document.getElementById('input');
    let ordered_list = document.getElementById('ordered_list');

    if (input.value === '') {

        alert('Please insert value');
        return;
    }


    let textSpan = document.createElement('span');
    textSpan.textContent = input.value + " ";
    todo_Value.appendChild(textSpan);



    let todo_Value = document.createElement('li');
    let textNode = document.createTextNode(input.value + ' ');
    todo_Value.appendChild(textNode)
    ordered_list.appendChild(todo_Value);


    // function Edit todo list 
    let todo_EditButton = document.createElement('Button');
    todo_EditButton.textContent = 'Edit ';


    todo_EditButton.onclick = function () {

        let change_Value = prompt('Change todo item');
        todo_Value.innerHTML = change_Value

    };

    todo_Value.appendChild(todo_EditButton)



    // function Delete todo list
    let todo_DeleteButton = document.createElement('Button');
    todo_DeleteButton.textContent = 'Delete';


    todo_DeleteButton.onclick = function () {

        todo_Value.remove();

    };

    todo_Value.appendChild(todo_DeleteButton)



    input.value = ''
};

