import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPassword1Component } from './reset-password-1.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

describe('ResetPassword1Component', () => {
  let component: ResetPassword1Component;
  let fixture: ComponentFixture<ResetPassword1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ResetPassword1Component],
      providers: [FormBuilder, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title as "Reset Password"', () => {
    expect(component.title).toBe('Reset Password');
  });

  it('should handle features input correctly', () => {
    component.features = {
      showLoginLink: false,
      showPasswordStrength: false,
    };
    fixture.detectChanges();

    expect(component.features.showLoginLink).toBe(false);
    expect(component.features.showPasswordStrength).toBe(false);
  });

  it('should update isSubmitting signal correctly', () => {
    component.isSubmitting.set(true);
    expect(component.isSubmitting()).toBe(true);

    component.isSubmitting.set(false);
    expect(component.isSubmitting()).toBe(false);
  });

  it('should display resetError when set', () => {
    component.resetError = 'An error occurred';
    fixture.detectChanges();

    expect(component.resetError).toBe('An error occurred');
  });

  it('should inherit form submission behavior from BaseResetPasswordComponent', () => {
    jest.spyOn(component.submitResetPassword, 'emit');
    component.resetPasswordForm.setValue({
      password: 'ValidPass123!',
      confirmPassword: 'ValidPass123!',
    });

    component.onSubmit();

    expect(component.submitResetPassword.emit).toHaveBeenCalledWith({
      password: 'ValidPass123!',
      confirmPassword: 'ValidPass123!',
    });
  });
});
