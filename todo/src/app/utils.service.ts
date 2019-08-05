import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    key: string;
    date: string;
    time: string;

    allTasks = [];
    doneTasks = [];
    searchTasks = [];
    tasksRender = [];

    values: string;
    showHeader:boolean = false;
    filter: boolean = false;
    sorting: string;
    event;
    delete: boolean = true;
    id: number;
    deleteTaskWindow: boolean = false;
    editTaskWindow: boolean = false;
    taskEdit: string;
    search: boolean = false;

    constructor() {
    }

    //+
    getKeyDateTime() {
        let d = new Date();
        let year: string = d.getFullYear().toString();
        let month: string = (d.getMonth() + 1).toString();
        let date: string = d.getDate().toString();
        let hour: string = d.getHours().toString();
        let minutes: string = d.getMinutes().toString();
        let seconds: string = d.getSeconds().toString();

        if (month.length === 1) {
            month = "0" + month;
        }
        if (date.length === 1) {
            date = "0" + date;
        }
        if (hour.length === 1) {
            hour = "0" + hour;
        }
        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }
        this.key = year + month + date + hour + minutes + seconds;
        this.date = date + "." + month + "." + year;
        this.time = hour + ":" + minutes;
    }

    // AddTaskComponent
    //+/-
    addTask(task: string) {
        if (this.checkInput(task)) {
            this.getKeyDateTime();
            let taskSave = {
                key: this.key,
                date: this.date,
                time: this.time,
                priority: 1,
                task: task.trim(),
                done: false
            };
            localStorage.setItem(this.key, JSON.stringify(taskSave));

            this.allTasks.unshift(taskSave);

            UtilsService.clearInput();

            this.showTableHeader();
        }
    }

    //+/-
    checkInput(task) {
        let check = true;
        if (task.trim().length < 3) {
            alert("Task is very short!");
            check = false;
        } else if (task.trim().length > 20) {
            alert("Task is very long!");
            check = false;
        } else if (this.isDuplicateTask(task)) {
            alert("You have this task already!");
            check = false;
        }
        if (!check) {
            document.getElementById("main").style.display = 'none';
            document.body.style.background = 'blue';
        }
        return check;
    }

    //+
    isDuplicateTask(task) {
        for (let i = 0; this.allTasks.length > i; i++) {
            if (this.allTasks.length > 0 && this.allTasks[i].task === task.trim()) {
                return true;
            }
        }
        return false;
    }

    //+
    static clearInput(): void {
        document.getElementsByClassName("addTask__input")[0]['value'] = '';
    }


    // TaskComponent
    //+
    sortTasks(sorting) {

        this.sorting = sorting;

        switch (sorting) {
            case "dateAsc":
                UtilsService.sortDateAsc(this.tasksRender);
                break;
            case "dateDesc":
                UtilsService.sortDateDesc(this.tasksRender);
                break;
            case "priorDesc":
                UtilsService.sortPriorDesc(this.tasksRender);
                break;
            case "priorAsc":
                UtilsService.sortPriorAsc(this.tasksRender);
                break;
        }
    }

    static sortDateDesc(array) {
        array.sort(function (a, b) {
            return b.key - a.key
        });
    }

    static sortDateAsc(array) {
        array.sort(function (a, b) {
            return a.key - b.key
        });
    }

    static sortPriorDesc(array) {
        array.sort(function (a, b) {
            return b.priority - a.priority
        });
    }

    static sortPriorAsc(array) {
        array.sort(function (a, b) {
            return a.priority - b.priority
        });
    }

    //+
    getAllTasksLS() {
        for (let i = 0; localStorage.length > i; i++) {
            this.allTasks.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        this.tasksRender = this.allTasks;
    }

    //+
    getDoneTasks() {
        this.doneTasks = [];
        for (let i = 0; this.allTasks.length > i; i++) {
            if (this.allTasks[i].done === true) {
                this.doneTasks.push(this.allTasks[i]);
            }
        }
        this.tasksRender = this.doneTasks;
    }


    getSearchTasks() {
        this.searchTasks = [];
        if (this.filter) {
            for (let i = 0; i < this.doneTasks.length; i++) {
                if (this.doneTasks[i].task.indexOf(this.values) !== -1) {
                    this.searchTasks.push(this.doneTasks[i]);
                }
            }
        } else if (!this.filter) {
            for (let i = 0; i < this.allTasks.length; i++) {
                if (this.allTasks[i].task.indexOf(this.values) !== -1) {
                    this.searchTasks.push(this.allTasks[i]);
                }
            }
        }
        this.tasksRender = this.searchTasks;
    }

    //+/-
    filterTasks() {
        this.filter = !this.filter;

        if (this.filter && this.search) {
            this.tasksRender = [];
            for (let i = 0; i < this.searchTasks.length; i++) {
                if (this.searchTasks[i].done === true) {
                    this.tasksRender.push(this.searchTasks[i]);
                }
            }
        } else if (this.filter) {
            this.getDoneTasks();
        } else if (this.search) {
            this.getSearchTasks();
        } else {
            this.tasksRender = this.allTasks;
        }
    }

    //+
    deleteTask(event, id) {
        document.getElementById("main").style.display = 'none';
        document.body.style.background = 'red';
        this.delete = true;
        this.deleteTaskWindow = true;
        this.event = event;
        window.addEventListener("keyup", event => {
            if (event.key === "Enter" && this.delete === true) {
                this.confirmDelete();
            } else if (event.key === "Escape") {
                this.cancelDelete();
            }
        });
        this.id = id;
    }

    cancelDelete() {
        this.deleteTaskWindow = false;
        this.delete = false;
        document.getElementById("main").style.display = 'unset';
        document.body.style.background = 'unset';
    }

    //+
    getKey() {
        this.key = this.tasksRender[this.id].key;
    }

    //+
    getId() {
        for (let i = 0; i < this.allTasks.length; i++) {
            if (this.key === this.allTasks[i].key) {
                return i;
            }
        }
    }

    //+
    confirmDelete() {
        document.getElementById("main").style.display = 'unset';
        document.body.style.background = 'unset';
        this.getKey();

        for (let i = 0; this.allTasks.length > i; i++) {
            if (this.allTasks[i].key === this.key) {
                this.allTasks.splice(i, 1);
                break;
            }
        }

        if (this.filter) {
            this.doneTasks = [];
            this.getDoneTasks();
        }

        if (this.search) {
            this.tasksRender = [];
            this.getSearchTasks();
        }

        localStorage.removeItem(this.key);

        this.deleteTaskWindow = false;
        this.delete = false;

        if (this.allTasks.length === 0) {
            this.showHeader = false;
        }
    }


    editTask(event, id) {
        document.getElementById("main").style.display = 'none';
        document.body.style.background = 'blue';
        this.editTaskWindow = true;

        this.taskEdit = document.getElementById("task" + id).innerText;

        window.addEventListener("keyup", event => {
            if (event.key === "Escape") {
                this.cancelEdit();
            }
        });
        this.event = event;
        this.id = id;
    }

    cancelEdit() {
        this.editTaskWindow = false;
        document.getElementById("main").style.display = 'unset';
        document.body.style.background = 'unset';
    }

    confirmEdit() {
        document.getElementById("main").style.display = 'unset';
        document.body.style.background = 'unset';

        let task = document.getElementById("editTextarea")["value"];

        if (this.checkInput(task) === true) {

            this.editTaskWindow = false;

            this.getKey();

            this.allTasks[this.getId()].task = task;

            if (this.filter) {
                this.doneTasks = [];
                this.getDoneTasks();
            }

            if (this.search) {
                this.searchTasks = [];
                this.getSearchTasks();
            }

            let oldTask = this.allTasks[this.id];

            let taskUpdate = {
                key: oldTask.key,
                date: oldTask.date,
                time: oldTask.time,
                priority: oldTask.priority,
                task: task.trim(),
                done: oldTask.done
            };

            localStorage.setItem(this.key, JSON.stringify(taskUpdate));
        }
    }


    completeTask(event, id) {
        this.id = id;
        this.getKey();
        let oldTask = this.allTasks[this.getId()];
        let done = !oldTask.done;
        this.allTasks[this.getId()].done = done;

        let taskUpdate = {
            key: oldTask.key,
            date: oldTask.date,
            time: oldTask.time,
            priority: oldTask.priority,
            task: oldTask.task,
            done: done
        };

        if (this.filter) {
            this.doneTasks = [];
            this.getDoneTasks();
        }

        if (this.search) {
            this.searchTasks = [];
            this.getSearchTasks();
        }

        localStorage.setItem(this.key, JSON.stringify(taskUpdate));
    }


    changePriority(event, id, change) {
        this.id = id;
        this.getKey();

        let oldPriority = this.allTasks[this.getId()].priority;

        let newPriority = oldPriority + change;
        if (newPriority > 0) {
            this.allTasks[this.getId()].priority = newPriority;

            let key = this.allTasks[this.getId()].key;
            let oldTask = JSON.parse(localStorage.getItem(key));
            let taskUpdate = {
                key: oldTask.key,
                date: oldTask.date,
                time: oldTask.time,
                priority: newPriority,
                task: oldTask.task,
                done: oldTask.done
            };
            localStorage.setItem(key, JSON.stringify(taskUpdate));
        }
        this.sortTasks(this.sorting);
    }


    // PanelComponent
    showTableHeader() {
        if (localStorage.length > 0) {
            this.showHeader = true;
        }
    }



    inputSearch(event) {
        this.values = "";
        this.search = true;
        this.searchTasks = [];
        this.values += event.target.value;

        this.getSearchTasks();

        this.tasksRender = this.searchTasks;

        if (this.values.length === 0) {
            if (this.filter) {
                this.getDoneTasks();
                console.log(this.tasksRender);
            } else {
                this.tasksRender = this.allTasks;
            }
            this.search = false;
        }
    }
}
