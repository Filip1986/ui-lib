import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFactoryComponent } from './registration-factory.component';

describe('RegistrationFactoryComponent', () => {
  let component: RegistrationFactoryComponent;
  let fixture: ComponentFixture<RegistrationFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render Registration1Component for variant "1"', () => {
    component.variant = '1';
    fixture.detectChanges();
    const registration1 = fixture.nativeElement.querySelector('lib-registration-1');
    expect(registration1).toBeTruthy();
  });

  it('should render Registration2Component for variant "3"', () => {
    component.variant = '3';
    fixture.detectChanges();
    const registration2 = fixture.nativeElement.querySelector('lib-registration-2');
    expect(registration2).toBeTruthy();
  });

  it('should render Registration3Component for variant "2"', () => {
    component.variant = '2';
    fixture.detectChanges();
    const registration3 = fixture.nativeElement.querySelector('lib-registration-3');
    expect(registration3).toBeTruthy();
  });

  it('should emit submitRegistration when child component emits it', () => {
    const mockData = {
      username: 'test',
      email: 'test@example.com',
      password: 'password123',
      acceptTerms: true,
    };
    jest.spyOn(component.submitRegistration, 'emit'); // Jasmine's spyOn
    component.onSubmitRegistration(mockData);
    expect(component.submitRegistration.emit).toHaveBeenCalledWith(mockData);
  });

  it('should emit navigateToLoginRequest when child component emits it', () => {
    jest.spyOn(component.navigateToLoginRequest, 'emit');
    component.onNavigateToLogin();
    expect(component.navigateToLoginRequest.emit).toHaveBeenCalled();
  });
});
