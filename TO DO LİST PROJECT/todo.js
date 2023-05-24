//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1]; 
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ //Tüm event Listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", LoadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){
    
    if(confirm("Tümünü Silmek İstediğinize Emin Misiniz?")){
       //Arayüzden Todoları Silme; 
      //todoList.innerHTML = ""; //Yavaş yöntem
      while(todoList.firstElementChild !=null){
        todoList.removeChild(todoList.firstElementChild);
      }
      localStorage.removeItem("todos");
    }
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //Bulamadı
            listItem.setAttribute("style", "display: none !important");
            }
        else{
                //Buludu
            listItem.setAttribute("style", "display : block");
        }
    });
}
function deleteTodo(e){
    // console.log(e.target);
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Başarıyla Silindi");
    }
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
        
    todos.forEach(function(todo,index){
        if(todo == deletetodo){
            todos.splice(index,1); //Arrayden değeri silebiliriz.   
        }
    })};
    localStorage.setItem("todos",JSON.stringify("todos"));
}
function LoadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    
    })
}
function addTodo(e){ 
    const newTodo = todoInput.value.trim();
    if (newTodo === ""){ 

    showAlert("danger", "Lütfen bir todo girin...");
    
}
else{
    addTodoToUI(newTodo);
    addTodotoStorage(newTodo);
    showAlert("success", "Todo Başarıyla eklendi.");        
    }



e.preventDefault();   
} 
function getTodosFromStorage(){//Function'dan todoları alma!!!
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
return todos;    
}

function addTodotoStorage(newTodo){
let todos = getTodosFromStorage();
todos.push(newTodo);
localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert(type,message){
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.style.margin = '10px';
        alert.textContent = message;
        firstCardBody.appendChild(alert);
        setTimeout(function(){
            alert.remove();
        }, 2000);
        }       

    
function addTodoToUI(newTodo){// String değerini list item olarak UI'ya ekleyecek
     

const listItem = document.createElement("li");
const link = document.createElement("a");
link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>";
listItem.className = "list-group-item d-flex justify-content-between";
//Text node ekleme

listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

//Todo list'e list Item ekleme

todoList.appendChild(listItem);
console.log(listItem);
todoInput.value = "";

}
