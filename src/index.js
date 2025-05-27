import "./styles.css"
import { parse } from "date-fns";

const AllProject =  [];

class CreateProjectTodolist {
    constructor(ProjectName) {
        this.ProjectName = ProjectName
    };
    CreateProject() {
        const NewProject = this.ProjectName;
        AllProject.push(NewProject)
    };
}


class Todolist_CollectData_SaveData  {

    constructor (ProjectName,TaskTitle,TaskDescription,TaskStatus,TaskDueDate,Taskpriority) {
        this.ProjectName = ProjectName;
        this.TaskTitle = TaskTitle;
        this.TaskDescription = TaskDescription;
        this.Task_Status = TaskStatus;
        this.Task_DueDate = parse(TaskDueDate, 'dd/mm/yyyy', new Date());
        this.Task_priority = Taskpriority;

    }
    CollectData_PutData () {

        if (AllProject.find(item => item === ProjectName)) {
            console.log("Error");
        } else {
            AllProject.ProjectName.push(this);
        };
    };
};

class EditDetailsInTodolist {
    // Tomorrow I will do it 
}




class SaveDataTolocalStorage {
    SaveDataTolocalStorage() {
        localStorage.setItem('Project_Task',JSON.stringify(AllProject));
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

    constructor(ProjectName,TaskName) {
        this.ProjectName = ProjectName;
        this.TaskName = TaskName;
    }

    deleteTask() {
        for (let i = 0; i < All_Project.length; i++) {
            if (AllProject[i] == Project_task) {
                for (let i = 0 ; i < Project_task.length ; i++) {
                    if (Project_task[i] == deleteTask_User) {
                        Project_task.splice(i,1);
                        console.log("Delete Successfully");
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

    constructor(ProjectName) {
        this.ProjectName = ProjectName;
    };


    DeleteProject() {
        if (AllProject === 1) {
            console.log("You need atleast 1 project in your todolist");
            return
        };
        for (let i = 0 ; i < All_Project.length ; i++) {
            if (AllProject[i] === this.ProjectName ) {
                AllProject.splice(i,1);
            };
        };
    };
}

class ShowallTaskinList {
    ShowAlltask() {
        console.log(AllProject)
    }  
}

class RunInCLI {
    RunInCommendLine() {

    }
}


