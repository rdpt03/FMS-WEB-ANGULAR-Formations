import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form-component';
import { CommonModule } from '@angular/common';

describe('LoginFormComonent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, CommonModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
