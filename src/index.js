import "./styles.css";
import { parse } from "date-fns";

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

function RunAll() {
  return {
    RunInCLI() {
      const initialProject = prompt("Name of the initial project:");
      const createProject = new CreateProjectTodolist(initialProject);
      createProject.CreateProject();
      console.log(AllProject);

      while (true) {
        const UserSelection = prompt(
          "Choose an option:\n1. Create New Project\n2. Add Task\n3. Modify Task\n4. Delete Task\n5. Show All Projects\n6. Delete Project\n0. Exit"
        );

        if (UserSelection === "0") {
          alert("Exiting...");
          break;
        }

        switch (UserSelection) {
          case "1": {
            const NewProjectName = prompt("Enter new project name:");
            const createNewProject = new CreateProjectTodolist(NewProjectName);
            createNewProject.CreateProject();
            break;
          }

          case "2": {
            const numberOfTasks = parseInt(prompt("How many tasks to add?"), 10);
            for (let j = 0; j < numberOfTasks; j++) {
              const projectNameForTask = prompt("Project name to add task to:");
              const taskTitle = prompt("Task Title:");
              const taskDescription = prompt("Task Description:");
              const taskDueDate = prompt("Task Due Date (dd/MM/yyyy):");
              const taskPriority = prompt("Task Priority (1-3):");
              const taskStatus = prompt("Task Status (e.g., 'Pending')");

              const task = new CreateTodo(
                taskTitle,
                taskDescription,
                taskStatus,
                taskDueDate,
                taskPriority
              );
              task.CollectData_PutData(projectNameForTask);
            }
            break;
          }

          case "3": {
            const ProjectName = prompt("Project name:");
            const Task = prompt("Task title to edit:");
            const WhatDetail = prompt("Which field to edit (e.g., TaskTitle, TaskDescription, Task_Status, Task_Priority):");
            const Newdata = prompt("Enter new value:");
            const EditDetails = new EditDetailsInTodolist(ProjectName, Task, WhatDetail, Newdata);
            EditDetails.EditDetails();
            break;
          }

          case "4": {
            const ProjectName = prompt("Project name:");
            const TaskName = prompt("Task title to delete:");
            const DeleteTodo = new DeleteTodolistItems(ProjectName, TaskName);
            DeleteTodo.deleteTask();
            break;
          }

          case "5": {
            console.log(AllProject);
            alert("Check console for project details");
            break;
          }

          case "6": {
            const ProjectName = prompt("Project name to delete:");
            const DeleteProjects = new DeleteProject(ProjectName);
            DeleteProjects.DeleteProject();
            break;
          }

          default:
            alert("Invalid option. Please select a number from 0 to 6.");
        }
      }
    }
  };
}

