import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTestComponent } from './add-new-test.component';

describe('AddNewTestComponent', () => {
  let component: AddNewTestComponent;
  let fixture: ComponentFixture<AddNewTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
