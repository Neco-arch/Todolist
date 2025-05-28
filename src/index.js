import "./styles.css";
import { parse } from "date-fns";

const AllProject = [];

class CreateProjectTodolist {
  constructor(ProjectName) {
    this.ProjectName = ProjectName;
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
    this.Task_Status = TaskStatus;
    this.Task_DueDate = parse(TaskDueDate, 'dd/MM/yyyy', new Date());
    this.Task_Priority = TaskPriority;
  }

  CollectData_PutData(ProjectName) {
    const project = AllProject.find(item => item.name === ProjectName);

    if (!project) {
      console.log("Error: Project not found");
    } else {
      project.tasks.push(this);
    }
  }
}

class EditDetailsInTodolist {
  // To be implemented
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
    const project = AllProject.find(p => p.name === this.ProjectName);
    if (!project) {
      console.log("Project not found");
      return;
    }

    const taskIndex = project.tasks.findIndex(task => task.TaskTitle === this.TaskName);
    if (taskIndex !== -1) {
      project.tasks.splice(taskIndex, 1);
      console.log("Deleted Successfully");
    } else {
      console.log("Task not found");
    }
  }
}

class DeleteProject {
  constructor(ProjectName) {
    this.ProjectName = ProjectName;
  }

  DeleteProject() {
    if (AllProject.length <= 1) {
      console.log("You need at least 1 project in your todo list.");
      return;
    }

    const index = AllProject.findIndex(p => p.name === this.ProjectName);
    if (index !== -1) {
      AllProject.splice(index, 1);
      console.log("Project deleted.");
    } else {
      console.log("Project not found.");
    }
  }
}

function RunAll() {
  return {
    RunInCLI() {
      const projectName = prompt("Name of the project:");
      const createProject = new CreateProjectTodolist(projectName);
      createProject.CreateProject();
      console.log(AllProject);

      for (let i = 1; i < 10; i++) {
        const UserSelection = prompt(
          "1.Create New Project  2.Add Task  3.Modify Task  4.Delete Task  5.ShowAllTask 6.Delete Project"
        );

        if (UserSelection === "1") {
          const NewProjectName = prompt("Name of the project:");
          const createNewProject = new CreateProjectTodolist(NewProjectName);
          createNewProject.CreateProject();
        } 
        else if (UserSelection === "2") {
          const numberOfTasks = parseInt(prompt("How many tasks to add?"), 10);
          for (let j = 0; j < numberOfTasks; j++) {
            const projectNameForTask = prompt("Project Name to add task to:");
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
            alert(AllProject);
          }
        } 
        else if (UserSelection === "3") {
          // TODO: Implement modify task functionality
        } 
        else if (UserSelection === "4") {
          const ProjectName = prompt("What is your Project Name?");
          const TaskName = prompt("Task you want to delete?");
          const DeleteTodo = new DeleteTodolistItems(ProjectName, TaskName);
          DeleteTodo.deleteTask();
        } 
        else if (UserSelection === "5") {
          console.log(AllProject);
        } 
        else if (UserSelection === "6") {
          const ProjectName = prompt("What Project do you want to delete?");
          const DeleteProjects = new DeleteProject(ProjectName);
          DeleteProjects.DeleteProject();
        } 
        else {
          alert("Invalid option. Please select a number from 1 to 6.");
        }
      }
    }
  };
}


const Run = RunAll();
Run.RunInCLI();
