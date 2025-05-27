import { th } from "date-fns/locale";
import "./styles.css"
import { parse } from "date-fns";

const All_Project =  [];

class ConvertToArray {
    constructor(title,description,duedate,priority,TaskStatus) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.TaskStatus = TaskStatus
        this.priority = priority;
    };
}

class CreateProjectTodolist {
    constructor(ProjectName) {
        this.ProjectName = ProjectName
    };
    CreateProject() {
        const NewProject = this.ProjectName;
        All_Project.push(NewProject)
    };
}


class Todolist_CollectData_SaveData  {

    CollectData_PutData () {
        const Project_Name = prompt("What project does this task in ");
        const Task_title = prompt("What is your task title");
        const Task_description = prompt("What is your task description");
        const Task_Status = prompt("What is your task stage right now (Todo,Inprogress,Done)")
        const Task_DueDate = prompt("What is your due date for your task (DD/MM/YYYY)");
        const ParseDate = parse(Task_DueDate, 'dd/mm/yyyy', new Date());
        const Task_priority = prompt("What is your task priority (1-3)");

        if (Project.find(item => item === Project_Name)) {
            console.log("Error");
        } else {
            const newtask = new ConvertToArray(Task_title,Task_description,ParseDate,Task_priority,Task_Status);
            All_Project.Project_Name.push(newtask);
        };
    };
};


class SaveDataTolocalStorage {
    SaveDataTolocalStorage() {
        localStorage.setItem('Project_Task',JSON.stringify(All_Project));
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
        const Project_task = prompt("What does your task you want to delete belong to What Project")
        const deleteTask_User = prompt("What task do you want to delete?");
        for (let i = 0; i < All_Project.length; i++) {
            if (All_Project[i] == Project_task) {
                for (let i = 0 ; i < Project_task.length ; i++) {
                    if (Project_task[i] == deleteTask_User) {
                        Project_task.splice(i,1)
                        console.log("Delete Successfully")
                    } 
                }
            } else {
                console.log("Project not found");
                return;
            };
            };
        };
}

class DeleteProject {
    DeleteProject() {
        if (All_Project === 1) {
            console.log("You need atleast 1 project in your todolist");
            return
        } 
        const Project_UserWanttodelete = prompt("What project do you want to delete");
        for (let i = 0 ; i < All_Project.length ; i++) {
            if (All_Project[i] === Project_UserWanttodelete ) {
                All_Project.splice(i,1)
            }
        }
    };
}

class ShowallTaskinList {
    ShowAlltask() {
        console.log(All_Project)
    }
}


