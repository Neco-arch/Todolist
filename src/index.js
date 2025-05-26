import { prototype } from "html-webpack-plugin";
import "./styles.css";
import { parse } from "date-fns";
import { ProvidePlugin } from "webpack";

const Project =  [];


class TodolistData {
    constructor(title,description,duedate,priority,TaskStatus) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.TaskStatus = TaskStatus
        this.priority = priority;
    };

    CreateProject(ProjectName) {
        Project.push(ProjectName);
    };
};

class Todolist_CollectData_SaveData extends TodolistData {
    CollectData_PutData () {
        const Project_Name = prompt("What project does this task in ");
        const Task_title = prompt("What is your task title");
        const Task_description = prompt("What is your task description");
        const Task_Status = prompt("What is your task stage right now (Todo,Inprogress,Done)")
        const Task_DueDate = prompt("What is your due date for your task (DD/MM/YYYY)");
        const ParseDate = parse(Task_DueDate, 'dd/mm/yyyy', new Date());
        const Task_priority = prompt("What is your task priority (1-3)");

        if (Project.find(item => item === Task_Project)) {
            console.log("Error");
        } else {
            const newtask = new TodolistData(Task_title,Task_description,ParseDate,Task_priority,Task_Status);
            Project.Project_Name.push(newtask);
        };
    };
};


class SaveDataTolocalStorage {
    
    SaveDataTolocalStorage() {
        localStorage.setItem('Project_Task',JSON.stringify(Project));
    };

    Retrieve_data_from_localStorage () {
        const StoredTaskData =  JSON.parse(localStorage.getItem('Project_Task'));
        localStorage.removeItem('Project_Task');

        if (Array.isArray(StoredTaskData)) {
            Project.length = 0;;
            Project.push(StoredTaskData);
        };
    };
};

class DeleteTodolistItems {
    deleteTask() {

        const deleteTaskUser = prompt("What task do you want to delete?");
        for (let i = 0; i < this.project.length; i++) {
            if (Project[i] == deleteTaskUser) {
                Project.splice(i,1);
                console.log("Delete Task Successfully");
                return;
            } else {
                console.log("Task not found");
            };
            };
        };
}

class ShowallTaskinList {
    ShowAlltask() {
        console.log(Project)
    }
}

class Run_in_CLI extends TodolistData{
    RunAlllogic() {
        if (Project.length === 0) {
            const ProjectName = prompt("Project Name ")
            this.CreateProject(ProjectName);
        } else {
            const CreateTodolistProject = this.CreateProject;
            const AddTaskToProject = new Todolist_CollectData_SaveData;
            const DeleteTask = new DeleteTodolistItems;
            const ShowAllTask = new ShowallTaskinList;
            const Userinput = prompt("1.Add Task 2.DeleteTask 3.Add Project 4.ShowYourTask (1-4)")
            if (Userinput === 1) {
                AddTaskToProject.CollectData_PutData();
            
            } if (Userinput === 2) {
                DeleteTask.deleteTask()
            } if (Userinput === 3) {
                CreateTodolistProject()
            } if (Userinput === 4) {
                ShowAllTask.ShowAlltask()
            }
            

            
        }
    }
}






