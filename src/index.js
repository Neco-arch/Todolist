// === IMPORTS === //
import "./styles.css";
import { parse, format } from "date-fns";
import img from "../Assets/resources/Icons/CloseIcon.png";
import BoxIcon from "../Assets/resources/Icons/list-box-outline.png";
import EditIcon from "../Assets/resources/Icons/hammer-wrench.svg"

const AllProject = [];
let currentlyEditingTask = { projectIndex: null, taskIndex: null };

// === CLASSES === //
class CreateProject {
  constructor(ProjectName) {
    this.ProjectName = ProjectName;
  }

  CreateProject() {
    AllProject.push({
      name: this.ProjectName,
      tasks: []
    });
    localStorage.setItem("Project_Task", JSON.stringify(AllProject));
  }
}

class CreateTodolist {
  constructor(TaskProject, TaskTitle, TaskDescription, TaskStatus, TaskDueDate, TaskPriority) {
    this.TaskProject = TaskProject;
    this.TaskTitle = TaskTitle;
    this.TaskDescription = TaskDescription;
    this.TaskStatus = TaskStatus;
    this.TaskDueDate = TaskDueDate;
    this.TaskPriority = TaskPriority;
  }

  CollectData_PutData() {
    let project = AllProject.find(
      item => item.name.trim().toLowerCase() === this.TaskProject.trim().toLowerCase()
    );

    if (!project) {
      const ProjectName = prompt("What is your project name?");
      project = { name: ProjectName, tasks: [] };
      AllProject.push(project);
    }

    const NewTask = {
      TaskTitle: this.TaskTitle,
      TaskDescription: this.TaskDescription,
      Status: this.TaskStatus,
      DueDate: this.TaskDueDate,
      Priority: this.TaskPriority
    };

    project.tasks.push(NewTask);
    localStorage.setItem("Project_Task", JSON.stringify(AllProject));
  }
}

class CreateTaskCard {
  constructor(taskTitle, dueDate, TaskPriority) {
    this.taskTitle = taskTitle;
    this.dueDate = dueDate;
    this.TaskPriority = TaskPriority;
  }

  createCard() {
    const parent = document.querySelector(".TaskCard");
    if (!parent) return;

    const cardDiv = this.createDiv(parent, "ToDocard");

const priority = Number(this.TaskPriority);

if (priority === 1) {
  cardDiv.style.backgroundColor = "red";
  cardDiv.style.color = "white";
} else if (priority === 2) {
  cardDiv.style.backgroundColor = "green";
  cardDiv.style.color = "white";
} else if (priority === 3) {
  cardDiv.style.backgroundColor = "blue";
  cardDiv.style.color = "white";
}

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "TickButton";
    cardDiv.appendChild(checkBox);

    this.createH2(cardDiv, this.taskTitle);

    const input = document.createElement("input");
    input.type = "date";
    input.className = "Date-input";

    if (this.dueDate && typeof this.dueDate === "string") {
      try {
        const parsedDate = parse(this.dueDate, "dd/MM/yyyy", new Date());
        input.value = format(parsedDate, "yyyy-MM-dd");
      } catch {
        input.value = "";
      }
    }

    input.addEventListener("change", () => {
      const newFormatted = format(parse(input.value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
      this.updateDueDate(this.taskTitle, newFormatted);
    });

    cardDiv.appendChild(input);

    const EditandDelete = document.createElement("div");
    EditandDelete.className = "EditandDeleteDiv";

    const EditTask = document.createElement("img");
    EditTask.src = EditIcon;
    EditTask.className = "EditButton";
    EditandDelete.appendChild(EditTask);

    const image = document.createElement("img");
    image.src = img;
    image.id = "DeleteTask";
    image.className = "DeleteIcon";
    EditandDelete.appendChild(image);

    cardDiv.appendChild(EditandDelete);
  }

  updateDueDate(taskTitle, newDate) {
    const project = AllProject.find(p => p.tasks.some(task => task.TaskTitle === taskTitle));
    if (!project) return;
    const task = project.tasks.find(task => task.TaskTitle === taskTitle);
    if (task) task.DueDate = newDate;
    localStorage.setItem("Project_Task", JSON.stringify(AllProject));
  }

  createDiv(parent, className) {
    const div = document.createElement("div");
    div.className = className;
    parent.appendChild(div);
    return div;
  }

  createH2(parent, textContent) {
    const h2 = document.createElement("h2");
    h2.textContent = textContent;
    h2.className = "TaskTitle";
    parent.appendChild(h2);
  }
}

class CreateProjectSidebar {
  constructor(Name) {
    this.Name = Name;
  }

  CreateSideBar() {
    const Parent = document.querySelector(".All_Project_Display");
    const a = document.createElement("a");
    const h2 = document.createElement("h3");

    a.href = "#";
    a.className = "ChangePage";
    h2.textContent = this.Name;

    const Image = document.createElement("img");
    Image.src = BoxIcon;
    Image.className = "Icon_Nav";

    a.appendChild(Image);
    a.appendChild(h2);
    Parent.appendChild(a);
  }
}

class LoadingData {
  LoadData() {
    const storedValue = localStorage.getItem("Project_Task");
    AllProject.length = 0;
    if (storedValue) AllProject.push(...JSON.parse(storedValue));
  }

  LoadTask() {
    for (let i = 0; i < AllProject.length; i++) {
      const Tasks = AllProject[i].tasks || [];
      for (let z = 0; z < Tasks.length; z++) {
        const CreateCard = new CreateTaskCard(Tasks[z].TaskTitle, Tasks[z].DueDate, Tasks[z].Priority);
        CreateCard.createCard();
      }
    }
  }

  LoadProject() {
    if (AllProject.length === 0) {
      const Project_Name = prompt("Project name :");
      const CreatenewProject = new CreateProject(Project_Name);
      const CreateProjectDOM = new CreateProjectSidebar(Project_Name);
      CreatenewProject.CreateProject();
      CreateProjectDOM.CreateSideBar();
    }
  }
}

// === EVENT LISTENERS === //
document.addEventListener("DOMContentLoaded", () => {
  const LoadDataInstance = new LoadingData();
  LoadDataInstance.LoadData();
  LoadDataInstance.LoadTask();

  for (let i = 0; i < AllProject.length; i++) {
    const name = AllProject[i].name;
    const CreateProjectS = new CreateProjectSidebar(name);
    CreateProjectS.CreateSideBar();
  }
});

document.querySelector(".TaskCard").addEventListener("click", (e) => {
  if (e.target.id === "DeleteTask") {
    const card = e.target.closest(".ToDocard");
    const taskTitle = card.querySelector(".TaskTitle").textContent;

    const project = AllProject.find(p => p.tasks.some(task => task.TaskTitle === taskTitle));
    if (!project) return;

    project.tasks = project.tasks.filter(task => task.TaskTitle !== taskTitle);
    localStorage.setItem("Project_Task", JSON.stringify(AllProject));

    card.remove();
  }

  if (e.target.classList.contains("EditButton")) {
    const card = e.target.closest(".ToDocard");
    const taskTitle = card.querySelector(".TaskTitle").textContent;

    for (let i = 0; i < AllProject.length; i++) {
      const index = AllProject[i].tasks.findIndex(t => t.TaskTitle === taskTitle);
      if (index !== -1) {
        const task = AllProject[i].tasks[index];
        currentlyEditingTask = { projectIndex: i, taskIndex: index };

        document.querySelector("#Edit_Task_Name").value = task.TaskTitle;
        document.querySelector("#Edit_Task_Description").value = task.TaskDescription;
        document.querySelector("#Edit_Task_Status").value = task.Status;
        document.querySelector("#Edit_Task_DueDate").value = format(parse(task.DueDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
        document.querySelector("#Edit_Task_Priority").value = task.Priority;

        document.querySelector(".EditTaskDialog").showModal();
        break;
      }
    }
  }
});

document.querySelector(".Submit_Edit").addEventListener("click", () => {
  const i = currentlyEditingTask.projectIndex;
  const j = currentlyEditingTask.taskIndex;
  const task = AllProject[i].tasks[j];

  task.TaskTitle = document.querySelector("#Edit_Task_Name").value.trim();
  task.TaskDescription = document.querySelector("#Edit_Task_Description").value.trim();
  task.Status = document.querySelector("#Edit_Task_Status").value.trim();
  task.DueDate = format(parse(document.querySelector("#Edit_Task_DueDate").value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
  task.Priority = document.querySelector("#Edit_Task_Priority").value.trim();

  localStorage.setItem("Project_Task", JSON.stringify(AllProject));
  document.querySelector(".EditTaskDialog").close();

  document.querySelector(".TaskCard").innerHTML = "";
  new LoadingData().LoadTask();
});

document.querySelector(".Cancel_Edit").addEventListener("click", () => {
  document.querySelector(".EditTaskDialog").close();
});
