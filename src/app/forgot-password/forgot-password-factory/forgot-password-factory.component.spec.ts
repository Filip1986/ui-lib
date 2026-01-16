import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordFactoryComponent } from './forgot-password-factory.component';
import { ForgotPassword1Component } from '../forgot-password-1/forgot-password-1.component';
import { ForgotPassword2Component } from '../forgot-password-2/forgot-password-2.component';
import { ForgotPasswordVariant } from '../models/forgot-password-contract';

describe('ForgotPasswordFactoryComponent', () => {
  let component: ForgotPasswordFactoryComponent;
  let fixture: ComponentFixture<ForgotPasswordFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render ForgotPassword1Component when variant is "1"', () => {
    component.variant = '1';
    fixture.detectChanges();

    const forgotPassword1 = fixture.nativeElement.querySelector('lib-forgot-password-1');
    expect(forgotPassword1).toBeTruthy();
  });

  it('should render ForgotPassword2Component when variant is "2"', () => {
    component.variant = '2';
    fixture.detectChanges();

    const forgotPassword2 = fixture.nativeElement.querySelector('lib-forgot-password-2');
    expect(forgotPassword2).toBeTruthy();
  });

  it('should render ForgotPassword3Component when variant is "3"', () => {
    component.variant = '3';
    fixture.detectChanges();

    const forgotPassword3 = fixture.nativeElement.querySelector('lib-forgot-password-3');
    expect(forgotPassword3).toBeTruthy();
  });

  it('should emit submitForgotPassword event when child component emits it', () => {
    jest.spyOn(component.submitForgotPassword, 'emit');
    component.variant = '1';
    fixture.detectChanges();

    const forgotPassword1 = fixture.debugElement.query((el) => el.name === 'lib-forgot-password-1')
      .componentInstance as ForgotPassword1Component;

    forgotPassword1.submitForgotPassword.emit({ email: 'test@example.com' });

    expect(component.submitForgotPassword.emit).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should emit navigateToLoginRequest event when child component emits it', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');
    component.variant = '2';
    fixture.detectChanges();

    const forgotPassword2 = fixture.debugElement.query((el) => el.name === 'lib-forgot-password-2')
      .componentInstance as ForgotPassword2Component;

    forgotPassword2.navigateToLoginRequest.emit();

    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });

  it('should default to ForgotPassword1Component when variant is invalid', () => {
    component.variant = 'invalid' as ForgotPasswordVariant;
    fixture.detectChanges();

    const forgotPassword1 = fixture.nativeElement.querySelector('lib-forgot-password-1');
    expect(forgotPassword1).toBeTruthy();
  });
});
