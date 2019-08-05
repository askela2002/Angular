import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../utils.service";

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

    constructor(private utils: UtilsService) {}

    ngOnInit() {
    }

}
