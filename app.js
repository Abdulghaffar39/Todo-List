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

    let input = document.getElementById('input').value;
    let ordered_list = document.getElementById('ordered_list');

    if(input.value === ''){

        alert('Please insert value');
        return;
    }
    
    for(let i = 0; i < input.length; i++){
        
        
        ordered_list.innerHTML += `<li>${input}
        <button>Edit</button>
        <button>Delete</button>
        </li>`
        
        
        input = ''
    }



    // let todo_Value = document.createElement('li');
    // todo_Value.appendChild(document.createTextNode(input.value));
    // ordered_list.appendChild(todo_Value)

    
    
    // // function Edit todo list 
    // let todo_EditButton = document.createElement('Button');
    // todo_EditButton.appendChild(document.createTextNode('Edit'));
    // ordered_list.appendChild(todo_EditButton);

    // todo_EditButton.onclick = function () {
        
    //     let change_Value = prompt('Change todo item');
    //     todo_Value.innerHTML = change_Value
        
    // };
    // ordered_list.appendChild(todo_EditButton)
    
    
    
    // // function Delete todo list
    // let todo_DeleteButton = document.createElement('Button');
    // todo_DeleteButton.appendChild(document.createTextNode('Delete'));
    // ordered_list.appendChild(todo_DeleteButton);

    // todo_DeleteButton.onclick = function () {

    //     todo_Value.remove()

    // };
    // ordered_list.appendChild(todo_DeleteButton)



    // // edit_todo()
    // // delete_todo()

};


// function edit_todo() {

//     let todo_EditButton = document.createElement('Button');
//     todo_EditButton.appendChild(document.createTextNode('Edit'));
//     ordered_list.appendChild(todo_EditButton);

//     todo_EditButton.onclick = function () {

//         let change_Value = prompt('Change todo item');
//         todo_Value.innerHTML = change_Value

//     };

//     ordered_list.appendChild(todo_EditButton)

// };


// function delete_todo() {

//     let todo_DeleteButton = document.createElement('Button');
//     todo_DeleteButton.appendChild(document.createTextNode('Delete'));
//     ordered_list.appendChild(todo_DeleteButton);

//     todo_DeleteButton.onclick = function () {


//     };

//     ordered_list.appendChild(todo_DeleteButton)

// };
