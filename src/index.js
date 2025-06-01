import "./styles.css";
import { parse } from "date-fns";
import { Creatediv, CreateButton, CreateH1, CreateH2, CreateImg, CreateParagraph } from "./DomModule";



const AllProject = [];

class CreateProjectTodolist {
  constructor(ProjectName) {
    this.ProjectName = ProjectName.trim();
  }

  CreateProject() {
    AllProject.push({
      name: this.ProjectName,
      tasks: []
    });
  }
}

class CreateTodo {
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
    }
  }
}

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
    }
  }
}

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
    }
  }
}

class DeleteTodolistItems {
  constructor(ProjectName, TaskName) {
    this.ProjectName = ProjectName;
    this.TaskName = TaskName;
  }

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
  }
}

class CreateTaskCard {
  CreateCard() {
    const TaskCard = document.querySelector(".TaskCard");
    const Div = Creatediv(ToDoCard,"TaskCard");
    const CreateCheckBox = document.createElement("input");
    CreateCheckBox.type = "checkbox";
    CreateCheckBox.name = "option";
    CreateCheckBox.className = "TickButton";
    Div.appendChild(CreateCheckBox);
    const H2 = CreateH2(Div,"","Example");
  }
}

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
  }
}



