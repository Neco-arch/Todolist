import "./styles.css";
import { parse } from "date-fns";
import {Creatediv,CreateH2} from "./DomModule";



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
      console.log("Task added to project:", ProjectName);
      console.log("Updated project:", project);
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

class DeleteTodolistItems {
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
      alert("Task deleted successfully");
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
      alert("Project deleted.");
    } else {
      alert("Project not found.");
    }
  };
};

class CreateTaskCard {
  constructor(taskTitle, parentSelector) {
    this.taskTitle = taskTitle;
    this.parentSelector = parentSelector;
  }

  createCard() {
    const parent = document.querySelector(".TaskCard");


    const cardDiv = Creatediv(parent, "ToDocard");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "taskComplete";
    checkBox.className = "TickButton";
    cardDiv.appendChild(checkBox);
    CreateH2(cardDiv, "", this.taskTitle);

    const Image = document.createElement("img");
    Image.className = "DeleteButton";
    Image.src = "/Assets/resources/Icons/CloseIcon.png"
    cardDiv.appendChild(Image)
  }
}

document.querySelector(".Submit").addEventListener("click", () => {
  const Dialog = document.querySelector(".AddTask");
  const TaskName = document.querySelector("#Task_Name");
  const TaskDescription = document.querySelector("#Task_Description");
  const TaskStatus = document.querySelector("#Task_Status");
  const TaskDueDate = document.querySelector("#Task_DueDate");
  const TaskPriority = document.querySelector("#Task_Priority");

  const Create = new CreateTodolist(TaskName.value, TaskDescription.value, TaskStatus.value, TaskDueDate.value, TaskPriority.value);
  const CreateCard = new CreateTaskCard(TaskName);
  TaskName.value = "";
  TaskDescription.value = "";
  TaskStatus.value = "";
  TaskDueDate.value = "";
  TaskPriority.value = ""
  CreateCard.createCard();
  

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
