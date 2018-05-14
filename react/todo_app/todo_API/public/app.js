$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    
    $("#todoInput").keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });

    $(".list").on("click", "span", function(e){
        e.stopPropagation();
        deleteTodo($(this).parent());
    });

    $(".list").on("click", "li", function(){
        updateTodo($(this));    
    });

});

function addTodos(todos){
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);
    if(todo.completed){
        newTodo.addClass("done");
    }
    $(".list").append(newTodo);
}

function createTodo(){
    var userInput = $("#todoInput").val();
    $.post("/api/todos", {name:  userInput})
    .then(function(newTodo){
        $("#todoInput").val("");
        addTodo(newTodo); 
    })
    .catch(function(err){
        console.log(err);
    });
}

function deleteTodo(todo){
    console.log(todo.data("id"));
    $.ajax({
        method: "DELETE",
        url: "/api/todos/" + todo.data("id")
    })
    .then(function(data){
        console.log(data);
    });
    todo.remove();
}

function updateTodo(todo){
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone};
    $.ajax({
        method: "PUT",
        url: "/api/todos/" + todo.data("id"),
        data: updateData
    })
    .then(function(data){
        todo.toggleClass("done");
        todo.data("completed", isDone);
    });
    
}
