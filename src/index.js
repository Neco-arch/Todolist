import "./styles.css";
import { parse, format } from "date-fns";
import img from "../Assets/resources/Icons/CloseIcon.png";
import BoxIcon from "../Assets/resources/Icons/list-box-outline.png";

const AllProject = [];

class CreateProject {
  constructor(ProjectName) {
    this.ProjectName = ProjectName
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
  constructor(TaskTitle, TaskDescription, TaskStatus, TaskDueDate, TaskPriority) {
    this.TaskTitle = TaskTitle;
    this.TaskDescription = TaskDescription;
    this.TaskStatus = TaskStatus;
    this.TaskDueDate = TaskDueDate;
    this.TaskPriority = TaskPriority;
  }

  CollectData_PutData(ProjectName = "Default") {
    let project = AllProject.find(
      item => item.name.trim().toLowerCase() === ProjectName.trim().toLowerCase()
    );

    if (!project) {
      ProjectName = prompt("What is your project name?");
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

    const image = document.createElement("img");
    image.src = img;
    image.id = "DeleteTask";
    image.className = "DeleteIcon";
    cardDiv.appendChild(image);
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
    this.Name = Name
  }

  CreateSideBar() {
    const Parent = document.querySelector(".All_Project_Display");
    const a = document.createElement("a");
    a.href = "#"
    const Image = document.createElement("img")
    Image.src = BoxIcon;
    Image.className = "Icon_Nav";
    a.appendChild(Image)
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
    if (AllProject.length !== 0) {

    } else {
      const Project_Name = prompt("Project name :");
      const CreatenewProject = new CreateProject(Project_Name);
      const CreateProjectDOM = new CreateProjectSidebar(Project_Name);
      CreatenewProject.CreateProject();
      CreateProjectDOM.CreateSideBar();
    }
  }
}

document.querySelector(".Submit").addEventListener("click", () => {
  const Dialog = document.querySelector(".AddTask");
  const TaskName = document.querySelector("#Task_Name");
  const TaskDescription = document.querySelector("#Task_Description");
  const TaskStatus = document.querySelector("#Task_Status");
  const TaskDueDate = document.querySelector("#Task_DueDate");
  const TaskPriority = document.querySelector("#Task_Priority");

  const taskNameValue = TaskName.value.trim();
  const taskDescriptionValue = TaskDescription.value.trim();
  const taskStatusValue = TaskStatus.value.trim();
  const taskDueDateValue = format(parse(TaskDueDate.value, "yyyy-MM-dd", new Date()), "dd/MM/yyyy");
  const taskPriorityValue = TaskPriority.value.trim();

  const create = new CreateTodolist(
    taskNameValue,
    taskDescriptionValue,
    taskStatusValue,
    taskDueDateValue,
    taskPriorityValue
  );
  create.CollectData_PutData("Default");

  const createCard = new CreateTaskCard(taskNameValue, taskDueDateValue);
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
  Dialog.show();
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


document.addEventListener("DOMContentLoaded", () => {
  const LoadData = new LoadingData();
  LoadData.LoadData();
  LoadData.LoadTask();
});

document.querySelector("#CreateProject").addEventListener("click", () => {
  const AddProject = document.querySelector(".AddProject");
  AddProject.show()
})

document.querySelector(".Submit_Project").addEventListener("click", () => {
  const AddProject = document.querySelector(".AddProject");
  const Project_Name = document.querySelector("#Project_Name")
  const CreateNewProject = new CreateProject(Project_Name);
  const CreateNewProjectDOM = new CreateProjectSidebar(Project_Name);
  CreateNewProject.CreateProject();
  CreateNewProjectDOM.CreateSideBar();
  AddProject.close();
})

document.querySelector("#CancelButton_Project").addEventListener("click", () => {
  const AddProject = document.querySelector(".AddProject");
  const Project_Name = document.querySelector("#Project_Name")
  Project_Name.value = ""
  AddProject.close()
})