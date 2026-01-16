import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibCurrencyInputComponent } from './lib-currency-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';
import { By } from '@angular/platform-browser';
import {
  CurrencyDisplayModeEnum,
  CurrencyInputSizeEnum,
  CurrencyInputVariantEnum,
} from './models/currency-input-contract';

describe('CurrencyInputComponent', () => {
  let component: LibCurrencyInputComponent;
  let fixture: ComponentFixture<LibCurrencyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        InputNumberModule,
        NoopAnimationsModule,
        LibCurrencyInputComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LibCurrencyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should always use currency mode', () => {
    expect(component.config.mode).toBe('currency');
  });

  it('should apply default currency as USD', () => {
    expect(component.config.currency).toBe('USD');
  });

  it('should apply default locale as en-US', () => {
    expect(component.config.locale).toBe('en-US');
  });

  it('should apply input properties correctly', () => {
    component.currency = 'EUR';
    component.locale = 'de-DE';
    component.currencyDisplay = CurrencyDisplayModeEnum.CODE;
    component.label = 'Price';
    component.value = 123.45;

    fixture.detectChanges();

    expect(component.config.currency).toBe('EUR');
    expect(component.config.locale).toBe('de-DE');
    expect(component.config.currencyDisplay).toBe(CurrencyDisplayModeEnum.CODE);
    expect(component.config.label).toBe('Price');
    expect(component.value).toBe(123.45);
  });

  it('should display error message when component has errors', () => {
    const control = component.inputNumberControl;
    control.setErrors({ required: true });
    component.touched = true;
    component.config.errorMessage = 'Price is required';

    fixture.detectChanges();

    expect(component.hasErrors).toBe(true);
    expect(component.validationMessage).toBe('Price is required');
  });

  it('should disable the input when disabled is set to true', () => {
    component.disabled = true;
    fixture.detectChanges();

    expect(component.inputNumberControl.disabled).toBe(true);
  });

  it('should apply container classes correctly', () => {
    component.size = CurrencyInputSizeEnum.NORMAL;
    component.variant = CurrencyInputVariantEnum.FILLED;
    component.containerClass = 'test-class';

    fixture.detectChanges();

    const containerClasses = component.currencyInputContainerClass;
    expect(containerClasses['currency-input-container']).toBe(true);
    expect(containerClasses['small']).toBe(true);
    expect(containerClasses['filled']).toBe(true);
    expect(containerClasses['test-class']).toBe(true);
  });

  it('should emit valueChange event when value changes', () => {
    jest.spyOn(component.valueChange, 'emit');

    component.inputNumberControl.setValue(250.5);

    expect(component.valueChange.emit).toHaveBeenCalledWith(250.5);
  });

  it('should format currency correctly based on locale and currency', () => {
    component.currency = 'JPY';
    component.locale = 'ja-JP';
    component.minFractionDigits = 0;
    component.maxFractionDigits = 0;
    component.value = 1000;

    fixture.detectChanges();

    const inputNumber = fixture.debugElement.query(By.css('p-inputnumber'));
    expect(inputNumber.componentInstance.currency).toBe('JPY');
    expect(inputNumber.componentInstance.locale).toBe('ja-JP');
    expect(inputNumber.componentInstance.minFractionDigits).toBe(0);
  });
});
