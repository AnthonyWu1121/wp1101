let itemCount = 0;
// let itemList = [];

let idCount = 0;

let todoCount = 0;
let completedCount = 0;
let statusList = [];
const Status_Todo = 0, Status_Completed = 1, Status_Deleted = -1;

function listCounting(){
    // itemCount = itemList.length;
    todoCount = 0;
    completedCount = 0;
    for(let i = 0; i < statusList.length; i++){
        if(statusList[i] === Status_Todo){
            todoCount++;
        }else if(statusList[i] === Status_Completed){
            completedCount++;
        }
    }
}

let root = document.getElementById("root");
let main = document.createElement("section");
main.classList.add("todo-app__main");
root.appendChild(main);

let input_bar = document.createElement("input");
input_bar.type = "text";
input_bar.placeholder = "What needs to be done?";
input_bar.id = "inputBar";
input_bar.classList.add("todo-app__input");
main.appendChild(input_bar);

let todo_list = document.createElement("ul");
todo_list.id = "todo-list";
todo_list.classList.add("todo-app__list");
todo_list.style.overflow = "auto";
main.appendChild(todo_list);
todo_list.style.display = "none";

let footer = document.createElement("footer");
footer.id = "todo-footer";
footer.classList.add("todo-app__footer");
let total = document.createElement("div");
total.classList.add("todo-app__total");
let view = document.createElement("ul");
view.classList.add("todo-app__view-buttons");
let all_button = document.createElement("button");
all_button.textContent = "All";
all_button.onclick = function(){showAll();};
let active_button = document.createElement("button");
active_button.textContent = "Active";
active_button.onclick = function(){showTodo();};
let completed_button = document.createElement("button");
completed_button.textContent = "Completed";
completed_button.onclick = function(){showCompleted();};
view.appendChild(all_button);
view.appendChild(active_button);
view.appendChild(completed_button);
let clean = document.createElement("div");
clean.classList.add("todo-app__clean");
let clear_button = document.createElement("button");
clear_button.textContent = "Clear completed";
clear_button.onclick = function(){claerCompleted();};
clean.appendChild(clear_button);
footer.appendChild(total);
footer.appendChild(view);
footer.appendChild(clean);
root.appendChild(footer);
footer.style.display = "none";
clear_button.style.display = "none";

input_bar.addEventListener('keypress', function (e) {
    let new_todo = input_bar.value;
    if (e.key === 'Enter' && new_todo !== "") {
        let item = addItem(new_todo);
        todo_list.appendChild(item);
        input_bar.value = "";
        itemCount++;
        todoCount++;
        idCount++;
        // itemList.push(new_todo);
        statusList.push(Status_Todo);
        showFooter();
    }
});

function showFooter(){
    listCounting();
    if(itemCount !== 0){
        todo_list.style.display = "";
        footer.style.display = "";
        total.textContent = "" + todoCount + " left";
    }else if(itemCount === 0){
        todo_list.style.display = "none";
        footer.style.display = "none";
    }
    if(completedCount !== 0){
        clear_button.style.display = "";
    }else{
        clear_button.style.display = "none";
    }
}

function addItem(new_todo){
    let num = idCount;
    let item = document.createElement("li");
    item.classList.add("todo-app__item");
    let check_box = document.createElement("div");
    check_box.classList.add("todo-app__checkbox");
    check_box.onclick = function(){doneTodo(num, this.nextElementSibling);};
    let input = document.createElement("input");
    input.id = num;
    input.type = "checkbox";
    let label = document.createElement("label");
    label.htmlFor = num;
    check_box.appendChild(input);
    check_box.appendChild(label);
    let detail = document.createElement("h1");
    detail.classList.add("todo-app__item-detail");
    detail.textContent = new_todo;
    let x = document.createElement("img");
    x.src = "img/x.png";
    x.classList.add("todo-app__item-x");
    x.onclick = function(){removeItem(num, this.parentElement);};
    item.appendChild(check_box);
    item.appendChild(detail);
    item.appendChild(x);
    return item;
}

function doneTodo(n, detail){
    let input = document.getElementById(n);
    
    if(input.checked === true){
        detail.style="text-decoration: line-through; opacity: 0.5;";
        statusList[n] = Status_Completed;
    }else if(input.checked === false){
        detail.style="text-decoration: none; opacity: 1;";
        statusList[n] = Status_Todo;
    }
    showFooter();
}

function removeItem(n, item){
    statusList[n] = Status_Deleted;
    // itemList.splice(n, 1);
    itemCount--;
    item.remove();
    showFooter();
}

function showAll(){
    let len = statusList.length;
    for(let i = 0; i < len; i++){
        if(statusList[i] === Status_Todo || statusList[i] === Status_Completed){
            let completedItem = document.getElementById(i).parentElement.parentElement;
            completedItem.style.display = "";
        }
    }
}

function showTodo(){
    let len = statusList.length;
    for(let i = 0; i < len; i++){
        if(statusList[i] === Status_Completed){
            let completedItem = document.getElementById(i).parentElement.parentElement;
            completedItem.style.display = "none";
        }else if(statusList[i] === Status_Todo){
            let completedItem = document.getElementById(i).parentElement.parentElement;
            completedItem.style.display = "";
        }
    }
}

function showCompleted(){
    let len = statusList.length;
    for(let i = 0; i < len; i++){
        if(statusList[i] === Status_Todo){
            let completedItem = document.getElementById(i).parentElement.parentElement;
            completedItem.style.display = "none";
        }else if(statusList[i] === Status_Completed){
            let completedItem = document.getElementById(i).parentElement.parentElement;
            completedItem.style.display = "";
        }
    }
}

function claerCompleted(){
    let len = statusList.length;
    for(let i = 0; i < len; i++){
        if(statusList[i] === Status_Completed){
            let completedItem = document.getElementById(i).parentElement.parentElement;
            completedItem.remove();
            statusList[i] = Status_Deleted;
            // itemList.splice(n, 1);
            itemCount--;
        }
    }
    showFooter();
}