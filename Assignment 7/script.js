const taskForm = document.getElementById("task-form");
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();

  if (title === "") {
    alert("Task title cannot be empty!");
    return;
  }

  addTask(title, description);
  taskForm.reset();
});

function addTask(title, description) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  const taskTitle = document.createElement("h3");
  taskTitle.textContent = title;

  const taskDescription = document.createElement("p");
  taskDescription.textContent = description;

  taskContent.appendChild(taskTitle);
  taskContent.appendChild(taskDescription);

  const taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Mark as Completed";
  completeBtn.className = "complete-btn";
  completeBtn.addEventListener("click", function () {
    taskTitle.classList.toggle("completed");
    taskDescription.classList.toggle("completed");
    completeBtn.textContent = taskTitle.classList.contains("completed")
      ? "Mark as Incomplete"
      : "Mark as Completed";
  });

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.addEventListener("click", function () {
    if (editBtn.textContent === "Edit") {
      editBtn.textContent = "Save";

      const editTitleInput = document.createElement("input");
      editTitleInput.type = "text";
      editTitleInput.value = taskTitle.textContent;
      editTitleInput.className = "styled-input";

      const editDescriptionInput = document.createElement("textarea");
      editDescriptionInput.value = taskDescription.textContent;
      editDescriptionInput.className = "styled-input";

      taskContent.replaceChild(editTitleInput, taskTitle);
      taskContent.replaceChild(editDescriptionInput, taskDescription);
    } else {
      editBtn.textContent = "Edit";

      const newTitle = taskContent.querySelector("input").value;
      const newDescription = taskContent.querySelector("textarea").value;

      taskTitle.textContent = newTitle;
      taskDescription.textContent = newDescription;

      taskContent.replaceChild(taskTitle, taskContent.querySelector("input"));
      taskContent.replaceChild(
        taskDescription,
        taskContent.querySelector("textarea")
      );
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    taskList.removeChild(taskDiv);
  });

  taskActions.appendChild(completeBtn);
  taskActions.appendChild(editBtn);
  taskActions.appendChild(deleteBtn);

  taskDiv.appendChild(taskContent);
  taskDiv.appendChild(taskActions);

  taskList.appendChild(taskDiv);
}
