import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { MessageService } from 'primeng/api';
import { ResetPasswordFormData } from './models/reset-password-contract';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let messageServiceMock: jest.Mocked<MessageService>;

  beforeEach(async () => {
    messageServiceMock = {
      add: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent],
      providers: [{ provide: MessageService, useValue: messageServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Event Emitters', () => {
    it('should emit submitResetPassword event with form data', () => {
      const formData: ResetPasswordFormData = {
        password: 'Password123',
        confirmPassword: 'Password123',
      };
      const submitSpy = jest.spyOn(component.submitResetPassword, 'emit');

      component.onSubmitResetPassword(formData);

      expect(submitSpy).toHaveBeenCalledWith(formData);
    });

    it('should emit navigateToLoginRequest event', () => {
      const navigateSpy = jest.spyOn(component.navigateToLoginRequest, 'emit');

      component.onNavigateToLogin();

      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should emit navigateToForgotPasswordRequest event', () => {
      const navigateSpy = jest.spyOn(component.navigateToForgotPasswordRequest, 'emit');

      component.onNavigateToForgotPassword();

      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  describe('Signal Management', () => {
    it('should set resetSuccessful to true', () => {
      component.setResetSuccessful();

      expect(component.resetSuccessful()).toBe(true);
    });

    it('should set tokenError to true', () => {
      component.setTokenError();

      expect(component.tokenError()).toBe(true);
    });
  });
});
