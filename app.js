function submit() {

  let todoText = document.getElementById('text').value;
  let todoResult = document.getElementById('Result');
  let ul = document.createElement('ul');
  let li = document.createElement('li');
  let text = document.createTextNode(todoText);
  let editButton = document.createElement('button');
  let edit = document.createTextNode('Edit');
  let deleteButton = document.createElement('button');
  let del = document.createTextNode('Delete');


editButton.addEventListener('click', () => {

  let editValue = prompt('Edit your Value', li.firstChild.textContent);

  if (editValue !== null && editValue.trim() !== "") {
    li.firstChild.textContent = editValue;
  }

});



deleteButton.addEventListener('click', () => {

  li.remove();
  editButton.remove();
  deleteButton.remove();

});



  deleteButton.appendChild(del);
  editButton.appendChild(edit);
  li.appendChild(text);
  ul.append(li, editButton, deleteButton);
  todoResult.appendChild(ul);

}

// =============================== Sign Up Started ============================================

function signUp(e) {

  e.preventDefault();

  let userName = document.getElementById('userName').value;
  let signUpEmail = document.getElementById('signUpEmail').value;
  let signUpPassword = document.getElementById('signUpPassword').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  if (userName === '' || signUpEmail === '' || signUpPassword === '' || confirmPassword === '') {

    alert('You did not enter a value in one or more boxes!');
    return;
  }
  else if (signUpPassword !== confirmPassword) {

    alert("These passwords don't match.");
    return;
  }

  if (signUpEmail.indexOf('@gmail.com') === -1) {

    alert("You spelled the email correctly.");
    return;
  }

  let obj = JSON.parse(window.localStorage.getItem('SignUp')) || [];


  let isFound = false;

  for (let i = 0; i < obj.length; i++) {


    if (obj[i].signUpEmail === signUpEmail) {

      alert('This Email Account is already exists!');

      isFound = true;
      return;
    }


  }

  if (!isFound) {

    alert('Account created successfuly');
    window.location.href = 'Login.html';

  }


  obj.push({

    userName,
    signUpEmail,
    signUpPassword,
    confirmPassword,
  });

  window.localStorage.setItem('SignUp', JSON.stringify(obj));

  // let isFound = false;

  // for(let i = 0; obj.length; i++){

  //   if( obj[i].signUpEmail === signUpEmail){      
  //     console.log(obj[i].signUpEmail);

  //     alert('This Email Account is already exists!');

  //     return;
  //     isFound = true;

  //   }
  // }

  // if(!isFound){

  //   alert('Your account has been created. Successfully!');
  //   window.location.href = 'Login.html';
  // }





  document.getElementById("signUpForm").reset();
}


// let signUpPassword = document.getElementById('signUpPassword');
// let confirmPassword = document.getElementById('confirmPassword');
// let signUpEyeIcon = document.getElementById("signUpEyeIcon");
// let confirmEyeIcon = document.getElementById("confirmEyeIcon");

// function togglePassword(input) {

//   if (input.type === "password") {

//     input.type = "text";   // Show password
//   }
//   else {

//     input.type = "password"; // Hide password
//   }
// }

// signUpEyeIcon.addEventListener("click", () => {
//   togglePassword(signUpPassword);
// });
// confirmEyeIcon.addEventListener("click", () => {
//   togglePassword(confirmPassword);
// });





// =============================== Sign Up Ended ==============================================


// =============================== Login Started ============================================


function login(e) {

  e.preventDefault()

  let loginEmail = document.getElementById('loginEmail').value;
  let loginPassword = document.getElementById('loginPassword').value;


  if (loginEmail === '' || loginPassword === '') {

    alert('Please enter Email or Password');
    return;
  }


  let getValue = JSON.parse(window.localStorage.getItem('SignUp'))

  let isFound = false;

  for (let i = 0; i < getValue.length; i++) {

    if (getValue[i].signUpEmail === loginEmail && getValue[i].signUpPassword === loginPassword) {

      alert('Logged in successfully!');
      isFound = true;
      window.localStorage.setItem('currentUserTodo', JSON.stringify({ validUser: getValue[i] }))
      window.location.href = 'todoFront.html'
      break;
    }


  };


  if (!isFound) {

    alert('Incorrect Email or Password');
    return;

  };



  document.getElementById("loginForm").reset();
}

// function login() {

//   const loginPassword = document.getElementById("loginPassword");
//   const loginEyeIcon = document.getElementById("loginEyeIcon");

//   function logtogglePass() {

//     if (loginPassword.type === "password") {

//       loginPassword.type = "text";

//     } else {

//       loginPassword.type = "password";

//     }
//   }


//   loginEyeIcon.addEventListener("click", () => {
//     logtogglePass(loginPassword);
//   });

// }
// =============================== Login Ended ==============================================


// =============================== todoFront Started ==============================================

let todo_Shopping = document.getElementById('todo_Shopping');
let todo_List = document.getElementById('todo_List');
let mainCenter = document.getElementById('mainCenter');
let createList = document.getElementById('createList');
let dateInput = document.getElementById('date');
let headC1 = document.getElementById('headC1');
getValue = JSON.parse(window.localStorage.getItem('SignUp'))


// headC1.innerHTML = `Hey, ${}`;

function timeAgo(date){

  const now = new Date();
  const diff  = Math.floor((now - date) / 1000);
  
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + " min ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  if (diff < 604800) return Math.floor(diff / 86400) + " days ago";
  
  return date.toLocaleDateString();
  
}

function create() {

  let createdAt = new Date();
  let parts = dateInput.value.split("-");
  let date = new Date(parts[0], parts[1] - 1, parts[2]);
  let options = { day: '2-digit', month: 'short', year: 'numeric' };
  let formatted = date.toLocaleDateString('en-GB', options);
  
  if (!dateInput.value){
    
    alert('Please select a date');
    return; 
  };

    
  if (todo_Shopping.checked) {

    createList.style.display = 'none';
    mainCenter.innerHTML += `
              <div class="todoFront_Container_2" id="todoFront_Container_2" data-created="${createdAt}">
              
                <div class="parent_1"  onclick="todoBox()">

                    <div class="child_1"><i class="fa-solid fa-cart-shopping" width='100%'></i></div>

                    <div class="child_2">

                        <h1>Shopping List</h1>

                        <div class="grandChild_1">

                            <p>${formatted}</p>
                            <button class='createdText'>${timeAgo(createdAt)}</button>

                        </div>

                    </div>

                </div>

                <div class="parent_2">

                    <div class="icon menu-open">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>

                    <div class="icon menu-close" style="display:none;">
                    <i class="fa-solid fa-x"></i> 
                    </div>

                    <div class="menu_box" id='menu_box'>


                        <div class="child_2 delete">

                            <i class="fa-solid fa-trash"></i>
                            <p>Delete</p>

                        </div>

                    </div>


                </div>

            </div>`
    }
    else if (todo_List.checked) {

      createList.style.display = 'none';
      mainCenter.innerHTML += `
              <div class="todoFront_Container_2" id="todoFront_Container_2" data-created="${createdAt}">

                <div class="parent_1" onclick="todoBox()">

                    <div class="child_1"><i class="fas fa-tasks"></i></div>

                    <div class="child_2">

                        <h1>To Do List</h1>

                        <div class="grandChild_1">

                            <p>${formatted}</p>
                            <button class='createdText'>${timeAgo(createdAt)}</button>

                        </div>

                    </div>

                </div>

                <div class="parent_2">

                    <div class="icon menu-open">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>

                    <div class="icon menu-close" style="display:none;">
                    <i class="fa-solid fa-x"></i> 
                    </div>

                    <div class="menu_box" id='menu_box'>

                        <div class="child_2 delete">

                            <i class="fa-solid fa-trash"></i>
                            <p>Delete</p>

                        </div>

                    </div>


                </div>

            </div>`
    }
    else{

    alert('Please select option');
    return;
    }

  todo_Shopping.checked = false;
  todo_List.checked = false;
};

setInterval(() => {
  document.querySelectorAll(".todoFront_Container_2").forEach(card => {
    let createdAt = new Date(card.getAttribute("data-created"));
    let textEl = card.querySelector(".createdText");
    textEl.textContent = timeAgo(createdAt);
  });
}, 60000);


mainCenter.addEventListener("click", (e) => {

  // Open menu
  if (e.target.closest(".menu-open")) {
    let parent = e.target.closest(".parent_2");
    parent.querySelector(".menu_box").style.display = "flex";
    parent.querySelector(".menu-open").style.display = "none";
    parent.querySelector(".menu-close").style.display = "flex";
  }

  // Close menu
  if (e.target.closest(".menu-close")) {
    let parent = e.target.closest(".parent_2");
    parent.querySelector(".menu_box").style.display = "none";
    parent.querySelector(".menu-open").style.display = "flex";
    parent.querySelector(".menu-close").style.display = "none";
  }

  // Delete todo
  if (e.target.closest('.delete')) {
    let card = e.target.closest('.todoFront_Container_2');
    card.remove(); // pura card delete ho jayega
  }

});

function plusImgWhite() {

  let plusImgWhite = document.getElementById('plusImgWhite');
  let plusImgBlue = document.getElementById('plusImgBlue');

  plusImgWhite.style.display = 'none';
  plusImgBlue.style.display = 'block';
};

function plusImgBlue() {

  let plusImgWhite = document.getElementById('plusImgWhite');
  let plusImgBlue = document.getElementById('plusImgBlue');

  plusImgWhite.style.display = 'block';
  plusImgBlue.style.display = 'none';

};

function createTodo() {

  createList.style.display = 'block'
  createList.style.display = 'flex'
}

function cencel() {
  
  let createList = document.getElementById('createList');
  createList.style.display = 'none';
};

function todoBox(){

  window.location.href = "todo_List.html";
}


function todoFront(){

  let paraC1 = document.getElementById('paraC1');
  let headC1 = document.getElementById('headC1');

  let user = JSON.parse(window.localStorage.getItem('currentUserTodo'));

  headC1.innerHTML = `Hey, ${user.validUser.userName}`;
  paraC1.innerHTML = user.validUser.userName[0];
  
  
}



// =============================== todoFront Ended ==============================================




// let main = document.getElementById('main')

// main.style.overflow = 'scroll'