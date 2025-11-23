/* =============================== TODO APP + AUTH FULL CODE =============================== */

/* =============================== Submit Todo =============================== */
function submit() {
  let todoText = document.getElementById('text').value;
  let todoResult = document.getElementById('Result');

  if (todoText.trim() === "") {
    alert("Please enter a todo item");
    return;
  }

  let li = document.createElement('li');
  li.textContent = todoText;

  let editButton = document.createElement('button');
  editButton.textContent = "Edit";
  editButton.addEventListener('click', () => {
    let editValue = prompt('Edit your Value', li.textContent);
    if (editValue !== null && editValue.trim() !== "") {
      li.textContent = editValue;
    }
  });

  let deleteButton = document.createElement('button');
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener('click', () => {
    li.remove();
    editButton.remove();
    deleteButton.remove();
  });

  let ul = document.createElement('ul');
  ul.append(li, editButton, deleteButton);
  todoResult.appendChild(ul);

  document.getElementById('text').value = "";
}

/* =============================== Sign Up =============================== */
function signUp(e) {
  e.preventDefault();

  let userName = document.getElementById('userName').value.trim();
  let signUpEmail = document.getElementById('signUpEmail').value.trim();
  let signUpPassword = document.getElementById('signUpPassword').value.trim();

  if (!userName || !signUpEmail || !signUpPassword) {
    alert('Please fill the form');
    return;
  }

  if (!signUpEmail.includes('@gmail.com')) {
    alert("Please enter a valid Gmail address");
    return;
  }

  let users = JSON.parse(localStorage.getItem('SignUp')) || [];

  if (users.some(u => u.signUpEmail === signUpEmail)) {
    alert('This Email Account already exists!');
    return;
  }

  users.push({ userName, signUpEmail, signUpPassword });
  localStorage.setItem('SignUp', JSON.stringify(users));

  alert('Account created successfully');
  document.getElementById("signUpForm").reset();
  window.location.href = 'Login.html';
}

/* =============================== Login =============================== */
function login(e) {
  e.preventDefault();

  let loginEmail = document.getElementById('loginEmail').value.trim();
  let loginPassword = document.getElementById('loginPassword').value.trim();

  if (!loginEmail || !loginPassword) {
    alert('Please fill the form');
    return;
  }

  let users = JSON.parse(localStorage.getItem('SignUp')) || [];
  let user = users.find(u => u.signUpEmail === loginEmail && u.signUpPassword === loginPassword);

  if (!user) {
    alert('Incorrect Email or Password');
    return;
  }

  alert('Logged in successfully!');
  localStorage.setItem('currentUserTodo', JSON.stringify({ validUser: user }));
  document.getElementById("loginForm").reset();
  window.location.href = 'todoFront.html';
}

/* =============================== TodoFront Page =============================== */

function todoFront() {
  let currentUserData = JSON.parse(localStorage.getItem('currentUserTodo'));
  if (!currentUserData) {
    alert("Please login first");
    window.location.href = "Login.html";
    return;
  }

  let user = currentUserData.validUser;
  document.getElementById('headC1').textContent = `Hey, ${user.userName}`;
  document.getElementById('paraC1').textContent = user.userName[0];
}

/* =============================== New Post Modal =============================== */
document.getElementById('newPostBtn').addEventListener('click', () => {
  document.getElementById('createList').style.display = 'block';
});

function closeModal() {
  document.getElementById('createList').style.display = 'none';
}

/* =============================== Time Ago =============================== */
function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + " min ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  if (diff < 604800) return Math.floor(diff / 86400) + " days ago";

  return date.toLocaleDateString();
}

/* =============================== Create Todo =============================== */
function create() {


  let title = document.getElementById('title').value.trim();
  let author = document.getElementById('author').value.trim();
  let description = document.getElementById('description').value.trim();

  if (!title || !author || !description) {

    alert('Please fill all fields');
    return;
  }

  let blog_obj = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;
  let createdAt = new Date();

  blog_obj.push({

    title,
    author,
    description,
    email: currentUser.signUpEmail,
    createdAt: createdAt.toISOString()
  });

  localStorage.setItem('UserValue', JSON.stringify(blog_obj));

  closeModal();
  displayTodos();

  title = '';
  author = '';
  description = '';

}

/* =============================== Display Todos =============================== */
function displayTodos() {

  let mainCenter = document.getElementById('mainCenter');
  mainCenter.innerHTML = ''; // Clear existing cards

  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;

  todos
    .filter(todo => todo.email === currentUser.signUpEmail)
    .forEach(todo => {
      let createdAt = new Date(todo.createdAt);

      let card = document.createElement('div');
      card.className = 'todoFront_Container_2';
      card.dataset.created = createdAt;

      card.innerHTML = `

                <div class="parent_1">
                    <h3>${todo.title}</h3> 
                    <small>${timeAgo(createdAt)}</small>
                </div>
                    <p>${todo.author}</p>
                    <p>${todo.description}</p>
                <button class="deleteBtn">Delete</button>

            `;

      mainCenter.appendChild(card);

      // Delete button
      card.querySelector('.deleteBtn').addEventListener('click', () => {

        let allTodos = JSON.parse(localStorage.getItem('UserValue')) || [];
        let newTodos = allTodos.filter(t => !(t.title === todo.title && t.email === currentUser.signUpEmail));

        localStorage.setItem('UserValue', JSON.stringify(newTodos));
        card.remove();

      });
    });
}

/* =============================== Update Time Ago Every Minute =============================== */

setInterval(() => {

  document.querySelectorAll(".todoFront_Container_2").forEach(card => {

    let createdAt = new Date(card.dataset.created);
    card.querySelector('small').textContent = timeAgo(createdAt);

  });

}, 60000);
