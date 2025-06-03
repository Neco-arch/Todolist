import "./styles.css";
import { parse } from "date-fns";
import {Creatediv,CreateH2} from "./DomModule";
import img from "../Assets/resources/Icons/CloseIcon.png";




const AllProject = [];

class CreateProject {
  constructor(ProjectName) {
    this.ProjectName = ProjectName.trim();
  }

  CreateProject() {
    AllProject.push({
      name: this.ProjectName,
      tasks: []
    });
    localStorage.setItem('Project_Task', JSON.stringify(AllProject));
  };
};

class CreateTodolist {
  constructor(TaskTitle, TaskDescription, TaskStatus, TaskDueDate, TaskPriority) {
    this.TaskTitle = TaskTitle;
    this.TaskDescription = TaskDescription;
    this.TaskStatus = TaskStatus;
    this.TaskDueDate = parse(TaskDueDate, 'dd/MM/yyyy', new Date());
    this.TaskPriority = TaskPriority;
  }

  CollectData_PutData(ProjectName) {
    const project = AllProject.find(
      item => item.name.trim().toLowerCase() === ProjectName.trim().toLowerCase()
    );

    if (!project) {
      alert("Error: Project not found");
    } else {
      const NewTask = {
        TaskTitle : this.TaskTitle,
        TaskDescription : this.TaskDescription,
        Status : this.TaskStatus,
        DueDate: this.TaskDueDate,
        Priority: this.TaskPriority
};

      project.tasks.push(NewTask);
      localStorage.setItem('Project_Task', JSON.stringify(AllProject));
    };
  };
};

class EditDetailsInTodolist {
  constructor(ProjectName, TaskName, FieldToEdit, NewInformation) {
    this.ProjectName = ProjectName;
    this.TaskName = TaskName;
    this.FieldToEdit = FieldToEdit;
    this.NewInformation = NewInformation;
  }

  EditDetails() {
    const project = AllProject.find(
      item => item.name.trim().toLowerCase() === this.ProjectName.trim().toLowerCase()
    );

    if (!project) {
      alert("Project not found");
      return;
    }

    const task = project.tasks.find(t => t.TaskTitle === this.TaskName);
    if (!task) {
      alert("Task not found");
      return;
    }

    if (this.FieldToEdit in task) {
      task[this.FieldToEdit] = this.NewInformation;
      localStorage.setItem('Project_Task', JSON.stringify(AllProject));
      alert("Task updated successfully");
    } else {
      alert("Invalid field name");
    };
  };
};

class SaveDataTolocalStorage {
  SaveDataTolocalStorage() {
    localStorage.setItem('Project_Task', JSON.stringify(AllProject));
  }

  Retrieve_data_from_localStorage() {
    const StoredTaskData = JSON.parse(localStorage.getItem('Project_Task'));
    localStorage.removeItem('Project_Task');

    if (Array.isArray(StoredTaskData)) {
      AllProject.length = 0;
      AllProject.push(...StoredTaskData);
    };
  };
};

class DeleteTask {
  constructor(ProjectName, TaskName) {
    this.ProjectName = ProjectName;
    this.TaskName = TaskName;
  };

  deleteTask() {
    const project = AllProject.find(
      p => p.name.trim().toLowerCase() === this.ProjectName.trim().toLowerCase()
    );
    if (!project) {
      alert("Project not found");
      return;
    }

    const taskIndex = project.tasks.findIndex(task => task.TaskTitle === this.TaskName);
    if (taskIndex !== -1) {
      project.tasks.splice(taskIndex, 1);
      localStorage.setItem('Project_Task', JSON.stringify(AllProject));
    } else {
      alert("Task not found");
    }
  };
};

class DeleteProject {
  constructor(ProjectName) {
    this.ProjectName = ProjectName;
  }

  DeleteProject() {
    if (AllProject.length <= 1) {
      alert("You need at least 1 project in your todo list.");
      return;
    }

    const index = AllProject.findIndex(
      p => p.name.trim().toLowerCase() === this.ProjectName.trim().toLowerCase()
    );
    if (index !== -1) {
      AllProject.splice(index, 1);
      localStorage.setItem('Project_Task', JSON.stringify(AllProject));
    } else {
      alert("Project not found.");
    }
  };
};

class CreateTaskCard {
  constructor(taskTitle, parentSelector) {
    this.taskTitle = taskTitle;
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

    const image = document.createElement("img");
    image.className = "DeleteButton";
    image.src = img;
    cardDiv.appendChild(image);
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
    h2.className = "TaskTitle"
    parent.appendChild(h2);
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
  const taskDueDateValue = TaskDueDate.value.trim();
  const taskPriorityValue = TaskPriority.value.trim();


  const create = new CreateTodolist(
    taskNameValue,
    taskDescriptionValue,
    taskStatusValue,
    taskDueDateValue,
    taskPriorityValue
  );



  const createCard = new CreateTaskCard(taskNameValue);
  createCard.createCard();


  TaskName.value = "";
  TaskDescription.value = "";
  TaskStatus.value = "";
  TaskDueDate.value = "";
  TaskPriority.value = "";

  Dialog.close();
});



document.querySelector("#CancelButton").addEventListener("click" ,() => {
  const Dialog = document.querySelector(".AddTask");
  const TaskName = document.querySelector("#Task_Name");
  const TaskDescription = document.querySelector("#Task_Description");
  const TaskStatus = document.querySelector("#Task_Status");
  const TaskDueDate = document.querySelector("#Task_DueDate");
  const TaskPriority = document.querySelector("#Task_Priority");
  TaskName.value = "";
  TaskDescription.value = "";
  TaskStatus.value = "";
  TaskDueDate.value = "";
  TaskPriority.value = ""
  Dialog.close();
});

document.querySelector(".AddTaskButton").addEventListener("click", () => {
  const Dialog = document.querySelector(".AddTask");
  Dialog.show();
});

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("DeleteButton")) {
    console.log("Delete button clicked!");
    const parent = event.target.parentElement;
    const TitleName = parent.closest(".TaskTitle")
    parent.remove(); 
  }
});
