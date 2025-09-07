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

    alert('Please enter value');
    return;
  }
  else if (signUpPassword !== confirmPassword) {

    alert('Match correct password!');
    return;
  }

  let obj = JSON.parse(window.localStorage.getItem('SignUp')) || [];

  obj.push({

    userName,
    signUpEmail,
    signUpPassword,
    confirmPassword,
  });

  window.localStorage.setItem('SignUp', JSON.stringify(obj));

  window.location.href = 'login.html';

  document.getElementById("signUpForm").reset();
}


let signUpPassword = document.getElementById('signUpPassword');
let confirmPassword = document.getElementById('confirmPassword');
let signUpEyeIcon = document.getElementById("signUpEyeIcon");
let confirmEyeIcon = document.getElementById("confirmEyeIcon");

function togglePassword(input) {

  if (input.type === "password") {

    input.type = "text";   // Show password
  }
  else {

    input.type = "password"; // Hide password
  }
}
signUpEyeIcon.addEventListener("click", () => {
  togglePassword(signUpPassword);
});
confirmEyeIcon.addEventListener("click", () => {
  togglePassword(confirmPassword);
});





// =============================== Sign Up Ended ==============================================


// =============================== Login Started ============================================


function login(e) {

  e.preventDefault()

  console.log('alksdfjjsafdhsalkfd');


}


const loginPassword = document.getElementById("loginPassword");
const loginEyeIcon = document.getElementById("loginEyeIcon");

loginEyeIcon.addEventListener("click", () => {  // yahi sahi hai

  if (loginPassword.type === "password") {

    loginPassword.type = "text";

  } else {

    loginPassword.type = "password";
    
  }
});


loginEyeIcon.addEventListener("click", () => {
  logtogglePass(loginPassword);
});




// =============================== Login Ended ==============================================