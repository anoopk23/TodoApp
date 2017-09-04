console.log("Is Script File Loading");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const ACTIVE_TODOS_ID = "active_todos_list_div";
const COMPLETED_TODOS_ID = "completed_todos_list_div";
const DELETED_TODOS_ID = "deleted_todos_list_div";

const NEW_TODO_INPUT_ID = "new_todo_input";



// IF you want to run a function everytime the page loads
// window.onload OR document.onload
// HW : Differences : Subtle difference when this method is called
// window.onload - more widely supported
//
window.onload = getTodosAJAX();

// addTodos
// id = "todos_list_div"
// todos_data_json =
// parent = div

// need only one arg(todos object) and add todos_list according to their status
// active todos goes to ACTIVE_TODOS_ID
// completed todos goes to COMPLETED_TODOS_ID
// deleted todos goes to DELETED_TODOS_ID
function addTodoElements(todos_data_json){

    console.log(todos_data_json);
    var todos = JSON.parse(todos_data_json);

    var activeParent = document.getElementById(ACTIVE_TODOS_ID);
    var completedParent = document.getElementById(COMPLETED_TODOS_ID);
    var deletedParent = document.getElementById(DELETED_TODOS_ID);

    // HW : Figure out "encouraged" view of doing this
    activeParent.innerHTML = "<h4>Active Todos</h4>";
    completedParent.innerHTML = "<h4>Completed Todos</h4>";
    deletedParent.innerHTML = "<h4>Deleted Todos</h4>";

    if (parent){

        // todos { id : {todo object}, id : {todo:object} ..}
        Object.keys(todos).forEach(

            function(key) {
                var todo_element = createTodoElement(key, todos[key]);
                if(todos[key].status == "ACTIVE") {
                    activeParent.appendChild(todo_element);

                }

                if(todos[key].status == "COMPLETED") {
                    completedParent.appendChild(todo_element);
                }

                if(todos[key].status == "DELETED") {
                    deletedParent.appendChild(todo_element);
                }

            }
        )
    }
}
// id : 1
// todo_object : {title: A Task, status : ACTIVE}
function createTodoElement(id, todo_object){

    var todo_element = document.createElement("div");
    todo_element.innerText = "";
    // HW: Read custom data-* attributes
    todo_element.setAttribute(
        "data-id", id
    );

    todo_element.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );

    var delete_button = document.createElement("button");
    // complete_button.innerText = "Mark as Complete";
    delete_button.setAttribute("onclick", "changeTodoAJAX("+id+", "+"'DELETED')");
    delete_button.setAttribute("class", "breathHorizontal");
    delete_button.setAttribute("class", "close");
    delete_button.setAttribute("style", "color: red;");

    delete_button.innerText = "x";

    if (todo_object.status == "ACTIVE"){

        var active_check = document.createElement("input");
        // complete_button.innerText = "Mark as Complete";
        active_check.setAttribute("onclick", "changeTodoAJAX("+id+", "+"'COMPLETED')");
        active_check.setAttribute("class", "breathHorizontal");
        active_check.setAttribute("type", "checkbox");
        todo_element.appendChild(active_check);
        todo_element.innerHTML += (todo_object.title);
        todo_element.appendChild(delete_button);
        console.log(todo_element);



    }


    if (todo_object.status == "DELETED"){
        // HW : Add this functionality
        // Add Delete Buttons for ACTIVE, COMPLETE TODO ITEMS
        // add a delete button
        // HW : Write this code
        var deleted_text = todo_object.title;

        todo_element.innerText = (deleted_text);
    }

    if (todo_object.status == "COMPLETED") {
        console.log(todo_object);
        var completed_check = document.createElement("input");
        // complete_button.innerText = "Mark as Complete";
        completed_check.setAttribute("onclick", "changeTodoAJAX("+id+", "+"'ACTIVE')");
        completed_check.setAttribute("class", "breathHorizontal");
        completed_check.setAttribute("type", "checkbox");
        completed_check.setAttribute("checked", "");
        todo_element.appendChild(completed_check);
        todo_element.append(todo_object.title);
        todo_element.appendChild(delete_button);


    }




    return todo_element;

}
// Repo URL - https://github.com/malikankit/todo-august-28

function getTodosAJAX(){

    // xhr - JS object for making requests to server via JS
    var xhr = new XMLHttpRequest();
    //
    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE){

            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText + "=============");
                addTodoElements(xhr.responseText);
            }
        }
    }// end of callback

    xhr.send(data=null);

}



function addTodoAJAX(){

    var title= document.getElementById(NEW_TODO_INPUT_ID).value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    // the data in this body will be of this form
    xhr.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded");

    // HW : Read format of X-W-F-U-E
    // HW : Look up encodeURI
    var data = "todo_title=" + encodeURI(title);

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);

}



function changeTodoAJAX(id, status){

    // Make a AJAX Request to update todo with the above id
    // If Response is 200 : refreshTodoElements


    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(status == "COMPLETED" || status == "ACTIVE" || status == "DELETED")
        data = "todo_status=" + status;
    else
        console.log("Error: status \""+status+"\" " + "not recognised");

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                var todos = xhr.responseText;


                addTodoElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }



    xhr.send(data);

    // The body can contain these parameters (XWFUE format)
    //todo_title=newtitle
    //todo_status= ACTIVE/COMPLETE/DELETED

}

















