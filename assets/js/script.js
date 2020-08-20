var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

//this can be document instead of window.document. 
//This line of code is searching the HTML file for a button element.
window.document.querySelector("button");

//this assigns a var to an object from the document. 
//This time we're using the ID to search for the object in the HTML document
var formEl = document.querySelector("#task-form");


var taskFormHandler = function(){
    //This prevents the page from automatically refreshinig and clearing out all the changes we just made usinig JS.
    event.preventDefault();
    // check if input values are empty strings


    //creates 2 vars in JS file by looking for the task name and task type in the form. 
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var isEdit = formEl.hasAttribute("data-task-id");
    console.log(isEdit);
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
        };
    
        createTaskEl(taskDataObj);
    }

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    formEl.reset();

    // send it as an argument to createTaskEl
    //createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    // this creates a new li element in the DOM.   
    var listItemEl = document.createElement("li");
    //this appliies the CSS to the element that gets added to the DOM
    listItemEl.className = "task-item";
    
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute("draggable", "true");


    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    //returns the first element within the html file that matches the id task-to-do (line 20)
    var tasksToDoEl = document.querySelector("#tasks-to-do");

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);;



    //appendChild means to add a new element to the dom and this will display on the webpage. 
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
}

//used to edit a task instead of create a task
var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};
  

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    

    actionContainerEl.appendChild(editButtonEl);
    
    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);
    
    // create status drop down
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
      }
    
    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
    
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    } 
    
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};  
  
var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name 
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    //pull the task name into the name form field
    document.querySelector("input[name='task-name']").value = taskName;

    // get content from task type 
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    //pull the task type into the select form field
    document.querySelector("select[name='task-type']").value = taskType;

    // change button name from add task to save task
    document.querySelector("#save-task").textContent = "Save Task";

};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
    }
      
  };
  
var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");

    event.dataTransfer.setData("text/plain", taskId);

    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
} 

var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
      event.preventDefault();
    }
  };
    
  var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    } 
    else if (statusType === "tasks-in-progress") {
    statusSelectEl.selectedIndex = 1;
    } 
    else if (statusType === "tasks-completed") {
    statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.appendChild(draggableElement);

  };
  

//this is looking at the formEL variable we set above (line 7 of JS file) and adding an action to "listen" for. 
formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragTaskHandler);

pageContentEl.addEventListener("dragover", dropZoneDragHandler);

pageContentEl.addEventListener("drop", dropTaskHandler);
