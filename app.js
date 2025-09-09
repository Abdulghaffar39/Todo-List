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

  editButton.addEventListener('click', (Event) => {

    let editValue = prompt('Edit your Value');
    li.innerHTML = editValue

  });

  deleteButton.addEventListener('click', (Event) => {

    ul.remove(li);

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

  if(signUpEmail.indexOf('@gmail.com') === -1){

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

      alert('successfully!');
      isFound = true;
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




// let main = document.getElementById('main')

// main.style.overflow = 'scroll'