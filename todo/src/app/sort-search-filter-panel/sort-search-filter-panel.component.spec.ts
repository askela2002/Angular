import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSearchFilterPanelComponent } from './sort-search-filter-panel.component';

describe('SortSearchFilterPanelComponent', () => {
  let component: SortSearchFilterPanelComponent;
  let fixture: ComponentFixture<SortSearchFilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortSearchFilterPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortSearchFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
