"use strict"; //använd modern javascript

const LOCAL_STORAGE_KEY_TODOS = "app.todos";
const LOCAL_STORAGE_KEY_TODOS_DATE = "app.todosDate";


let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS)) || [];
let todosDate = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TODOS_DATE)) || [];


let listRoot = document.querySelector("#list-root");
let listForm = document.querySelector("[data-list-form]");
let listFormDate = document.querySelector("[data-list-form-date]")
let listInput = document.querySelector("[data-list-input]");
let listInputDate = document.querySelector("[data-list-input-date]");


listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (listInput.value.trim() === "") {
    return;
  }
  todos.push(listInput.value.trim());
  updateList();
  listInput.value = "";
});

listFormDate.addEventListener("submit", (e) => {
  e.preventDefault();
  if (listInputDate.value.trim() === "") {
    return;
  }
  todosDate.push(listInputDate.value.trim());
  updateList();
  listInputDate.value = "";
});

function todoList(items) {
  let list = document.createElement("ul");
  items.forEach((item) => {
    let todoListItem = document.createElement("li");
    todoListItem.innerText = item;
    todoListItem.classList.add("todo-list-item");
    todoListItem.addEventListener("click", removeItem);
    list.append(todoListItem);
  });
  return list;
}

function removeItem(event) {
  let itemToRemove = event.target.innerText;
  todos = todos.filter((item) => item !== itemToRemove);
  todosDate = todos.filter((item) => item !== itemToRemove);
  updateList();
}

function updateList() {
  saveList();
  listRoot.innerHTML = "";
  listRoot.append(todoList(todos));
  listRoot.append(todoList(todosDate));
}


function saveList() {
  localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
  localStorage.setItem(LOCAL_STORAGE_KEY_TODOS_DATE, JSON.stringify(todosDate));
}

updateList();
