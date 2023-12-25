import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiceComponent } from './main-service.component';

describe('MainServiceComponent', () => {
  let component: MainServiceComponent;
  let fixture: ComponentFixture<MainServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainServiceComponent]
    });
    fixture = TestBed.createComponent(MainServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
