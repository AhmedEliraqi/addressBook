import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTitleTableComponent } from './job-title-table.component';

describe('JobTitleTableComponent', () => {
  let component: JobTitleTableComponent;
  let fixture: ComponentFixture<JobTitleTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTitleTableComponent]
    });
    fixture = TestBed.createComponent(JobTitleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
