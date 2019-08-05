import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../utils.service";

import {
  faCaretUp,
  faCaretDown,
  faFilter
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sort-search-filter-panel',
  templateUrl: './sort-search-filter-panel.component.html',
  styleUrls: ['./sort-search-filter-panel.component.scss']
})
export class SortSearchFilterPanelComponent implements OnInit {

  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faFilter = faFilter;

  constructor(private utils: UtilsService) {
  }



  ngOnInit() {
    this.utils.showTableHeader();
  }

}
