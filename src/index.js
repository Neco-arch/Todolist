import "./styles.css";
import { parse, format } from "date-fns";
import img from "./Assets/resources/Icons/CloseIcon.png";
import BoxIcon from "./Assets/resources/Icons/list-box-outline.png";
import EditIcon from "./Assets/resources/Icons/hammer-wrench.svg";


const AllProject = [];

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
  constructor(taskTitle, dueDate) {
    this.taskTitle = taskTitle;
    this.dueDate = dueDate;
  }

  createCard() {
    const parent = document.querySelector(".TaskCard");
    if (!parent) {
      console.error("Parent element not found");
      return;
    }

    const cardDiv = this.createDiv(parent, "ToDocard");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "taskComplete";
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
      } catch (err) {
        console.warn("Failed to parse date:", this.dueDate);
        input.value = "";
      }
    } else {
      input.value = "";
    }

    input.addEventListener("change", () => {
      const newFormatted = format(parse(input.value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
      this.updateDueDate(this.taskTitle, newFormatted);
    });

    cardDiv.appendChild(input);

    const CombineDiv = document.createElement("div");
    CombineDiv.className = "CombineDiv";

    const EditIcons = document.createElement("img")
    EditIcons.src = EditIcon;
    EditIcons.className = "EditIcon";

    const image = document.createElement("img");
    image.src = img;
    image.id = "DeleteTask";
    image.className = "DeleteIcon";

    CombineDiv.appendChild(EditIcons);
    CombineDiv.appendChild(image);
    cardDiv.appendChild(CombineDiv)

  }

  updateDueDate(taskTitle, newDate) {
    const project = AllProject.find((p) =>
      p.tasks.some((task) => task.TaskTitle === taskTitle)
    );
    if (!project) return;

    const task = project.tasks.find((task) => task.TaskTitle === taskTitle);
    if (!task) return;

    task.DueDate = newDate;
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
    if (storedValue) {
      const parsed = JSON.parse(storedValue);
      AllProject.length = 0;
      AllProject.push(...parsed);
    } else {
      console.log("Data not found");
      AllProject.length = 0;
    }
  }

  LoadTask() {
    for (let i = 0; i < AllProject.length; i++) {
      const Tasks = AllProject[i].tasks || [];
      for (let z = 0; z < Tasks.length; z++) {
        const TaskName = Tasks[z].TaskTitle;
        const TaskDueDate = Tasks[z].DueDate;
        const CreateCard = new CreateTaskCard(TaskName, TaskDueDate);
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

// ==== EVENT LISTENERS ==== //

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

document.querySelector(".Submit").addEventListener("click", () => {
  const Dialog = document.querySelector(".AddTask");
  const TaskName = document.querySelector("#Task_Name");
  const TaskDescription = document.querySelector("#Task_Description");
  const TaskStatus = document.querySelector("#Task_Status");
  const TaskDueDate = document.querySelector("#Task_DueDate");
  const TaskPriority = document.querySelector("#Task_Priority");
  const Project_Selector = document.querySelector(".Project_Selector");

  const taskTitleValue = TaskName.value.trim();
  const projectSelectorValue = Project_Selector.value;
  const taskDescriptionValue = TaskDescription.value.trim();
  const taskStatusValue = TaskStatus.value.trim();
  const taskDueDateValue = format(parse(TaskDueDate.value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
  const taskPriorityValue = TaskPriority.value.trim();

  const create = new CreateTodolist(
    projectSelectorValue,
    taskTitleValue,
    taskDescriptionValue,
    taskStatusValue,
    taskDueDateValue,
    taskPriorityValue
  );
  create.CollectData_PutData();

  const createCard = new CreateTaskCard(taskTitleValue, taskDueDateValue);
  createCard.createCard();

  TaskName.value = "";
  TaskDescription.value = "";
  TaskStatus.value = "";
  TaskDueDate.value = "";
  TaskPriority.value = "";

  Dialog.close();
});

document.querySelector("#CancelButton").addEventListener("click", () => {
  const Dialog = document.querySelector(".AddTask");
  document.querySelector("#Task_Name").value = "";
  document.querySelector("#Task_Description").value = "";
  document.querySelector("#Task_Status").value = "";
  document.querySelector("#Task_DueDate").value = "";
  document.querySelector("#Task_Priority").value = "";
  Dialog.close();
});

document.querySelector(".AddTaskButton").addEventListener("click", () => {
  const Dialog = document.querySelector(".AddTask");
  const Project_Selector = document.querySelector(".Project_Selector");

  Project_Selector.innerHTML = ""; // Clear old options
  for (let i = 0; i < AllProject.length; i++) {
    const option = document.createElement("option");
    option.textContent = AllProject[i].name;
    Project_Selector.appendChild(option);
  }

  Dialog.showModal();
});

document.querySelector(".TaskCard").addEventListener("click", (e) => {
  if (e.target && e.target.id === "DeleteTask") {
    const card = e.target.closest(".ToDocard");
    const taskTitle = card.querySelector(".TaskTitle").textContent;

    card.remove();

    const project = AllProject.find((p) =>
      p.tasks.some((task) => task.TaskTitle === taskTitle)
    );
    if (!project) return;

    project.tasks = project.tasks.filter((task) => task.TaskTitle !== taskTitle);
    localStorage.setItem("Project_Task", JSON.stringify(AllProject));

    console.log(`Deleted task: ${taskTitle}`);
  }
});

document.querySelector(".TaskCard").addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("EditIcon")) {
    const card = e.target.closest(".ToDocard");
    const taskTitle = card.querySelector(".TaskTitle").textContent;

    const project = AllProject.find((p) =>
      p.tasks.some((task) => task.TaskTitle === taskTitle)
    );
    if (!project) return;

    const task = project.tasks.find((t) => t.TaskTitle === taskTitle);
    if (!task) return;


    const dialog = document.querySelector(".AddTask");
    dialog.showModal();

    document.querySelector("#Task_Name").value = task.TaskTitle;
    document.querySelector("#Task_Description").value = task.TaskDescription;
    document.querySelector("#Task_Status").value = task.Status;
    document.querySelector("#Task_DueDate").value = format(
      parse(task.DueDate, "dd/MM/yyyy", new Date()),
      "yyyy-MM-dd"
    );
    document.querySelector("#Task_Priority").value = task.Priority;

    const Project_Selector = document.querySelector(".Project_Selector");
    Project_Selector.innerHTML = "";
    AllProject.forEach((proj) => {
      const option = document.createElement("option");
      option.textContent = proj.name;
      Project_Selector.appendChild(option);
    });
    Project_Selector.value = project.name;

    // Remove original card from DOM
    card.remove();

    // Remove task from project
    project.tasks = project.tasks.filter((t) => t.TaskTitle !== taskTitle);
    localStorage.setItem("Project_Task", JSON.stringify(AllProject));
  }
});

document.querySelector("#CreateProject").addEventListener("click", () => {
  const AddProject = document.querySelector(".AddProject");
  AddProject.showModal();
});

document.querySelector(".Submit_Project").addEventListener("click", () => {
  const AddProject = document.querySelector(".AddProject");
  const Project_Name = document.querySelector("#Project_Name");
  const projectNameValue = Project_Name.value.trim();

  if (projectNameValue === "") {
    alert("Project name cannot be empty.");
    return;
  }

  const CreateNewProject = new CreateProject(projectNameValue);
  const CreateNewProjectDOM = new CreateProjectSidebar(projectNameValue);
  CreateNewProject.CreateProject();
  CreateNewProjectDOM.CreateSideBar();

  Project_Name.value = "";
  AddProject.close();
});

document.querySelector("#CancelButton_Project").addEventListener("click", () => {
  const AddProject = document.querySelector(".AddProject");
  const Project_Name = document.querySelector("#Project_Name");
  Project_Name.value = "";
  AddProject.close();
});
