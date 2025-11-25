/* =============================== GLOBAL EDIT INDEX =============================== */
let editIndex = null;

/* =============================== Submit Todo (Old Simple Todo Feature) =============================== */
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
  window.location.href = 'home.html';
}

/* =============================== home Page =============================== */
function home() {
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

/* =============================== Modal =============================== */
document.getElementById('newPostBtn').addEventListener('click', () => {
  document.getElementById('createList').style.display = 'block';
});

function closeModal() {
  document.getElementById('createList').style.display = 'none';
  editIndex = null; // reset edit mode
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

/* =============================== Create OR Edit Todo =============================== */
function create() {

  let title = document.getElementById('title').value.trim();
  let author = document.getElementById('author').value.trim();
  let description = document.getElementById('description').value.trim();

  if (!title || !author || !description) {
    alert('Please fill all fields');
    return;
  }

  let todos = JSON.parse(localStorage.getItem("UserValue")) || [];
  let currentUser = JSON.parse(localStorage.getItem("currentUserTodo")).validUser;

  // === UPDATE TODO ===
  if (editIndex !== null) {
    todos[editIndex] = {
      title,
      author,
      description,
      email: currentUser.signUpEmail,
      createdAt: new Date().toISOString()
    };

    editIndex = null;
  }

  // === CREATE NEW TODO ===
  else {
    todos.push({
      title,
      author,
      description,
      email: currentUser.signUpEmail,
      createdAt: new Date().toISOString()
    });
  }

  localStorage.setItem("UserValue", JSON.stringify(todos));

  closeModal();
  displayTodos();
}

/* =============================== Highlight Text =============================== */
function highlightText(text, search) {
  if (!search) return text;
  let reg = new RegExp(search, "gi");
  return text.replace(reg, match => `<span class="highlight">${match}</span>`);
}

/* =============================== Display Todos =============================== */
function displayTodos() {
  let mainCenter = document.getElementById('mainCenter');
  mainCenter.innerHTML = '';

  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;

  todos
    .filter(todo => todo.email === currentUser.signUpEmail)
    .forEach((todo, index) => {
      let createdAt = new Date(todo.createdAt);

      let card = document.createElement('div');
      card.className = 'home_Container_2';
      card.dataset.created = createdAt;

      card.innerHTML = `
        <div class="parent_1">
            <h3>${todo.title}</h3>
            <small>${timeAgo(createdAt)}</small>
        </div>

        <hr />

        <div class="parent_2">
          <h4>${todo.author}</h4>
          <p>${todo.description}</p>
        </div>

        <div class="btnBox">
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </div>
      `;

      mainCenter.appendChild(card);

      /* ========== DELETE ========== */
      card.querySelector('.deleteBtn').addEventListener('click', () => {
        let allTodos = JSON.parse(localStorage.getItem('UserValue')) || [];
        allTodos.splice(index, 1);
        localStorage.setItem('UserValue', JSON.stringify(allTodos));
        displayTodos();
      });

      /* ========== EDIT ========== */
      card.querySelector('.editBtn').addEventListener('click', () => {

        document.getElementById('createList').style.display = 'block';

        document.getElementById('title').value = todo.title;
        document.getElementById('author').value = todo.author;
        document.getElementById('description').value = todo.description;

        let allTodos = JSON.parse(localStorage.getItem("UserValue")) || [];
        editIndex = allTodos.findIndex(t =>
          t.title === todo.title && t.email === currentUser.signUpEmail
        );
      });
    });
}

/* =============================== TimeAgo Auto Update =============================== */
setInterval(() => {
  document.querySelectorAll(".home_Container_2").forEach(card => {
    let createdAt = new Date(card.dataset.created);
    card.querySelector('small').textContent = timeAgo(createdAt);
  });
}, 60000);

/* =============================== Search =============================== */
function searchTodos() {
  let searchText = document.getElementById("inputSearch").value.toLowerCase();
  let mainCenter = document.getElementById('mainCenter');
  mainCenter.innerHTML = '';

  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;

  let filtered = todos.filter(todo =>
    todo.email === currentUser.signUpEmail &&
    todo.title.toLowerCase().includes(searchText)
  );

  filtered.forEach(todo => {
    let createdAt = new Date(todo.createdAt);

    let card = document.createElement('div');
    card.className = 'home_Container_2';

    card.innerHTML = `
        <div class="parent_1">
            <h3>${highlightText(todo.title, searchText)}</h3>
            <small>${timeAgo(createdAt)}</small>
        </div>

        <hr />

        <div class="parent_2">
            <h4>${todo.author}</h4>
            <p>${highlightText(todo.description, searchText)}</p>
        </div>
    `;

    mainCenter.appendChild(card);
  });
}

/* =============================== Filter =============================== */
function toggleFilterMenu() {
  let menu = document.getElementById("filterMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function filterNewest() {
  filterSort("newest");
  toggleFilterMenu();
}

function filterOldest() {
  filterSort("oldest");
  toggleFilterMenu();
}

function filterToday() {
  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;
  let today = new Date().toDateString();

  let filtered = todos.filter(t =>
    t.email === currentUser.signUpEmail &&
    new Date(t.createdAt).toDateString() === today
  );

  renderFiltered(filtered);
  toggleFilterMenu();
}

/* =============================== Sort Helper =============================== */
function filterSort(type) {
  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;

  let filtered = todos.filter(t => t.email === currentUser.signUpEmail);

  filtered.sort((a, b) => {
    return type === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  renderFiltered(filtered);
}


function filterAll() {
  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;

  let filtered = todos.filter(t => t.email === currentUser.signUpEmail); // all todos for current user
  renderFiltered(filtered);
}


/* =============================== Render Filtered =============================== */
function renderFiltered(list) {
  let mainCenter = document.getElementById('mainCenter');
  mainCenter.innerHTML = '';

  list.forEach(todo => {
    let createdAt = new Date(todo.createdAt);

    let card = document.createElement('div');
    card.className = 'home_Container_2';

    card.innerHTML = `
      <div class="parent_1">
          <h3>${todo.title}</h3>
          <small>${timeAgo(createdAt)}</small>
      </div>
      <hr>
      <div class="parent_2">
          <h4>${todo.author}</h4>
          <p>${todo.description}</p>
      </div>
    `;

    mainCenter.appendChild(card);
  });
}

/* =============================== Search Icon Autofocus =============================== */

function searchIcon() {

  document.getElementById("inputSearch").focus();
}

function renderFiltered(list) {

  let mainCenter = document.getElementById('mainCenter');
  mainCenter.innerHTML = '';

  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;

  list.forEach((todo, index) => {
    let createdAt = new Date(todo.createdAt);

    let card = document.createElement('div');
    card.className = 'home_Container_2';
    card.dataset.created = createdAt;

    card.innerHTML = `
  <div class="parent_1">
      <h3>${todo.title}</h3>
      <small>${timeAgo(createdAt)}</small>
  </div>
  <hr>
  <div class="parent_2">
      <h4>${todo.author}</h4>
      <p>${todo.description}</p>
  </div>
  <div class="btnBox">
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
  </div>
`;

    mainCenter.appendChild(card);
    
    /* ========== DELETE ========== */
    card.querySelector('.deleteBtn').addEventListener('click', () => {
      let allTodos = JSON.parse(localStorage.getItem('UserValue')) || [];

      // exact todo dhoondo using createdAt aur email
      let globalIndex = allTodos.findIndex(
        t => t.createdAt === todo.createdAt && t.email === currentUser.signUpEmail
      );

      if (globalIndex !== -1) {
        allTodos.splice(globalIndex, 1); // delete karo
        localStorage.setItem('UserValue', JSON.stringify(allTodos));

        // current filtered list ko update karo, purani filter ki tarah
        renderFiltered(list.filter(t => t.createdAt !== todo.createdAt));
      }
    });

    /* ========== EDIT ========== */
    card.querySelector('.editBtn').addEventListener('click', () => {
      document.getElementById('createList').style.display = 'block';
      document.getElementById('title').value = todo.title;
      document.getElementById('author').value = todo.author;
      document.getElementById('description').value = todo.description;

      let allTodos = JSON.parse(localStorage.getItem('UserValue')) || [];
      editIndex = allTodos.findIndex(
        t => t.title === todo.title && t.email === currentUser.signUpEmail
      );
    });

  });
}


function filterAll() {
  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;

  let filtered = todos.filter(t => t.email === currentUser.signUpEmail);
  renderFiltered(filtered);

  toggleFilterMenu(); // <-- hide the filter menu after clicking
}

function filterNewest() {
  filterSort("newest");
  toggleFilterMenu();
}

function filterOldest() {
  filterSort("oldest");
  toggleFilterMenu();
}

function filterToday() {
  let todos = JSON.parse(localStorage.getItem('UserValue')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUserTodo')).validUser;
  let today = new Date().toDateString();

  let filtered = todos.filter(t =>
    t.email === currentUser.signUpEmail &&
    new Date(t.createdAt).toDateString() === today
  );

  renderFiltered(filtered);
  toggleFilterMenu();
}
