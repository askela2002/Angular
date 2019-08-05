import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SortSearchFilterPanelComponent } from './sort-search-filter-panel/sort-search-filter-panel.component';
import { TasksComponent } from './tasks/tasks.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {UtilsService} from "./utils.service";

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    SortSearchFilterPanelComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [TasksComponent, SortSearchFilterPanelComponent, UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
