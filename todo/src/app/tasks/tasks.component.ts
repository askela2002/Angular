import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../utils.service";

import {
    faChevronUp,
    faChevronDown,
    faEdit,
    faCheckCircle,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {


    faChevronUp = faChevronUp;
    faChevronDown = faChevronDown;
    faEdit = faEdit;
    faCheckCircle = faCheckCircle;
    faTrashAlt = faTrashAlt;


    constructor(private utils: UtilsService) {
        this.utils.getAllTasksLS();
        this.utils.sortTasks("priorAsc");
    }


    ngOnInit() {
    }
}
