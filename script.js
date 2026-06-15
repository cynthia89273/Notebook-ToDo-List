window.onload = function () {
    loadTasks();
};
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    if (task === "") {
        return;
    }
    createTask(task, false);
    saveTask(task, false);
    input.value = "";
}
function createTask(taskText, completed) {
    let li = document.createElement("li");
    li.textContent = taskText;
    if (completed) {
        li.classList.add("completed");
    }
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateLocalStorage();
    });
    document.getElementById("taskList").appendChild(li);
}
function saveTask(taskText, completed) {
    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
        text: taskText,
        completed: completed
    });
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li")
        .forEach(li => {
            tasks.push({
                text: li.textContent,
                completed: li.classList.contains("completed")
            });
        });
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}
function loadTasks() {
    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}