import {Component} from '@angular/core';
import {UtilsService} from "./utils.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'TODO LIST';

    constructor(private utils: UtilsService) {
    }
}
