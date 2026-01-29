import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComonent } from './register-form-comonent';

describe('RegisterFormComonent', () => {
  let component: RegisterFormComonent;
  let fixture: ComponentFixture<RegisterFormComonent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComonent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComonent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
