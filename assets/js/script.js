//this can be document instead of window.document. 
//This line of code is searching the HTML file for a button element.
window.document.querySelector("button");

//this assigns a var to an object from the document. 
//This time we're using the ID to search for the object in the HTML document
var formEl = document.querySelector("#task-form");


taskFormHandler = function(){
    //This prevents the page from automatically refreshinig and clearing out all the changes we just made usinig JS.
    event.preventDefault();
    
    //creates 2 vars in JS file by looking for the task name and task type in the form. 
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    // this creates a new li element in the DOM.   
    var listItemEl = document.createElement("li");
    //this appliies the CSS to the element that gets added to the DOM
    listItemEl.className = "task-item";
    
    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);

    //returns the first element within the html file that matches the id task-to-do (line 20)
    var tasksToDoEl = document.querySelector("#tasks-to-do");

    //appendChild means to add a new element to the dom and this will display on the webpage. 
    tasksToDoEl.appendChild(listItemEl);
}


//this is looking at the formEL variable we set above (line 7 of JS file) and adding an action to "listen" for. 
formEl.addEventListener("submit", taskFormHandler);












// //this can be document instead of window.document. 
// //This line of code is searching the HTML file for a button element.
// window.document.querySelector("button");

// //this assigns a var to an object from the document. 
// //This time we're using the ID to search for the object in the HTML document
// var formEl = document.querySelector("#task-form");

// var tasksToDoEl = document.querySelector("#tasks-to-do");


// //this displays the html liine for the element with the #save-task id
// console.log(formEl);

// var createTaskHandler = function (){
//     event.preventDefault();
//     var taskTypeInput = document.querySelector("select[name='task-type']").value;
//     // create list item
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";

//     var taskNameInput = document.querySelector("input[name='task-name']");
//     console.log(taskNameInput);


    

//     // create div to hold task info and add to list item
//     var taskInfoEl = document.createElement("div");
//     // give it a class name
//     taskInfoEl.className = "task-info";
//     // add HTML content to div
//     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

//     listItemEl.appendChild(taskInfoEl);

//     // add entire list item to list
//     tasksToDoEl.appendChild(listItemEl);

//     console.log(event);
// } 

// //this is looking at the formEl variable we set above (line 7 of JS file) and adding an action to "listen" for 
// //formEL = variable addEventListener ("submit")= the event its watching for, createTaskHandler = function
// formEl.addEventListener("submit", createTaskHandler)




