//this can be document instead of window.document. 
//This line of code is searching the HTML file for a button element.
window.document.querySelector("button");

//this assigns a var to an object from teh document. 
//This time we're using the ID to search for the object in the HTML document
var buttonEl = document.querySelector("#save-task");
//this displays the html liine for the element with the #save-task id
console.log(buttonEl);

//this is looking at the buttonEl variable we set above (line 7 of JS file) and adding an action to "listen" for. 
buttonEl.addEventListener("click", function() {
    //returns the first Element within the html file that matches the id save-task (line 14)
    var buttonEl = document.querySelector("#save-task");
    //returns the first element within the html file that matches teh id task-to-do (line 20)
    var tasksToDoEl = document.querySelector("#tasks-to-do");
    
    // this creates a new li element in the DOM.   
    var listItemEl = document.createElement("li");
    //this appliies the CSS to the element that gets added to the DOM
    listItemEl.className = "task-item";
    
    //this writes whatever is in textContext to the li element
    listItemEl.textContent = "This is a new task.";
    //appendChild means to add a new element to the dom and this will display on the webpage. 
    tasksToDoEl.appendChild(listItemEl);
});



