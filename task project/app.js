//Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
  //Dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event 
  form.addEventListener("submit", addTask);
  //remove task from ul
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task){
    //create li element 
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create textnode and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = "<i class='fas fa-trash-alt'></i>";
    //append the link to li 
    li.appendChild(link);
    //append li to ul 
    taskList.appendChild(li);

  });
}


//add task
function addTask(e) {
  if (taskInput.value === '') {
    alert("Enter a task.")
  } else {
    //create li element 
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = "<i class='fas fa-trash-alt'></i>";
    //append the link to li 
    li.appendChild(link);
    //append li to ul 
    taskList.appendChild(li);
    //store to local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      //Remove from ls 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList. firstChild);
  }

  //clear from ls
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//filter
function filterTasks(e){
  text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task){
    const item  = task.firstChild.textContent;
    if(item.toLocaleLowerCase().indexOf(text) !== -1){
      task.style.display = "block";
    }else{
      task.style.display = "none";
    }
  });
}

//Store task in local storage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem('Color', 'red');

  localStorage.setItem('tasks', JSON.stringify(tasks));
}