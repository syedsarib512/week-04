// Selecting DOM elements
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Adding a new task
addTaskButton.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${taskText} <button class="delete-btn">X</button>`;
        taskList.appendChild(listItem);
        newTaskInput.value = "";

        // Mark task as complete
        listItem.addEventListener("click", () => {
            listItem.classList.toggle("complete");
        });

        // Delete task
        const deleteButton = listItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            taskList.removeChild(listItem);
        });
    }
});

// Additional feature: Save tasks to local storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(task => {
        tasks.push({
            text: task.firstChild.textContent.trim(),
            complete: task.classList.contains("complete")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${task.text} <button class="delete-btn">X</button>`;
            if (task.complete) {
                listItem.classList.add("complete");
            }
            taskList.appendChild(listItem);

            // Mark task as complete
            listItem.addEventListener("click", () => {
                listItem.classList.toggle("complete");
                saveTasks();
            });

            // Delete task
            const deleteButton = listItem.querySelector(".delete-btn");
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                taskList.removeChild(listItem);
                saveTasks();
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", loadTasks);
addTaskButton.addEventListener("click", saveTasks);
newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskButton.click();
    }
});
