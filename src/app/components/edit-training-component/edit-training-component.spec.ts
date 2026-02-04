import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainingComponent } from './edit-training-component';

describe('EditTrainingComponent', () => {
  let component: EditTrainingComponent;
  let fixture: ComponentFixture<EditTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrainingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
