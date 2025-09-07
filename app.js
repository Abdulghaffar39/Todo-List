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

// =============================== Login Started ============================================
const signUpPasswordloginPassword = document.getElementById("loginPassword");
const eyeIcon = document.getElementById("eyeIcon");

const signUpPassword = document.getElementById("signUpPassword");
const signUpEyeIcon = document.getElementById("signUpEyeIcon");

eyeIcon.addEventListener("click", () => {

  if (loginPassword.type === "password") {

    loginPassword.type = "text";
    eyeIcon.textContent = "🙈"; 

  } else {

    loginPassword.type = "password";
    eyeIcon.textContent = "👁️"; 

  }
});


signUpEyeIcon.addEventListener("click", () => {

  if (signUpPassword.type === "password") {

    signUpPassword.type = "text";

  } else {

    signUpPassword.type = "password";

  }
});

// =============================== Login Ended ==============================================