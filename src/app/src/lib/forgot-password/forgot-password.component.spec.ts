import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ForgotPasswordFormData } from './models/forgot-password-contract';

describe('ForgotPasswordComponent', (): void => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let messageServiceMock: jest.Mocked<MessageService>;

  beforeEach(async (): Promise<void> => {
    messageServiceMock = {
      add: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ToastModule, ForgotPasswordComponent],
      providers: [provideRouter([]), { provide: MessageService, useValue: messageServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', (): void => {
    expect(component).toBeTruthy();
  });

  describe('Event Emitters', (): void => {
    it('should emit submitForgotPassword event with form data', (): void => {
      const formData: ForgotPasswordFormData = { email: 'test@example.com' };
      const submitSpy = jest.spyOn(component.submitForgotPassword, 'emit');

      component.onSubmitForgotPassword(formData);

      expect(submitSpy).toHaveBeenCalledWith(formData);
    });

    it('should emit navigateToLoginRequest event', (): void => {
      const navigateSpy = jest.spyOn(component.navigateToLoginRequest, 'emit');

      component.onNavigateToLogin();

      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  describe('Reset Link Sent', (): void => {
    it('should set resetLinkSent to true', (): void => {
      component.setResetLinkSent();

      expect(component.resetLinkSent()).toBe(true);
    });
  });
});
