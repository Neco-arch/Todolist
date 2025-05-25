import "./styles.css";
import { parse } from "date-fns";

const Project =  [];


class TodolistData {
    constructor(title,description,duedate,priority,TaskStatus) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.TaskStatus = TaskStatus
        this.priority = priority;
    };

    CreateProject() {
        const ProjectName = prompt("What is your project ");
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
        localStorage.setItem('Project_Task',JSON.stringify(Project))
    };

    Retrieve_data_from_localStorage () {
        const StoredTaskData =  JSON.parse(localStorage.getItem('Project_Task'))
        localStorage.removeItem('Project_Task')

        if (Array.isArray(StoredTaskData)) {
            Project.length = 0;
            Project.push(StoredTaskData)
        }
    };
};

