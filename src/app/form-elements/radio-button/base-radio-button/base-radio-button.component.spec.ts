import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRadioButtonComponent } from './base-radio-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// Test-specific subclass with a template
@Component({
  selector: 'lib-test-base-radio-button',
  template: ` <input (focus)="onFocus($event)" (blur)="onBlur($event)" type="radio" /> `,
})
class TestBaseRadioButtonComponent extends BaseRadioButtonComponent {}

describe('BaseRadioButtonComponent', () => {
  let component: TestBaseRadioButtonComponent;
  let fixture: ComponentFixture<TestBaseRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBaseRadioButtonComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestBaseRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit focusEvent on radio button focus', () => {
    jest.spyOn(component.focusEvent, 'emit');
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('focus', new FocusEvent('focus'));
    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit blurEvent on radio button blur', () => {
    jest.spyOn(component.blurEvent, 'emit');
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('blur', new FocusEvent('blur'));
    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should apply configuration correctly', () => {
    component.config = {
      id: 'test-radio',
      name: 'test-group',
      label: 'Test Option',
      required: true,
      disabled: true,
      value: 'option1',
    };
    component.applyConfiguration();
    expect(component.config.id).toBe('test-radio');
    expect(component.config.name).toBe('test-group');
    expect(component.config.label).toBe('Test Option');
    expect(component.config.required).toBe(true);
    expect(component.radioControl.disabled).toBe(true);
    expect(component.config.value).toBe('option1');
  });

  it('should handle writeValue correctly', () => {
    component.writeValue('option1');
    expect(component.value).toBe('option1');
    expect(component.radioControl.value).toBe('option1');
  });

  it('should handle setDisabledState correctly', () => {
    component.setDisabledState(true);
    expect(component.config.disabled).toBe(true);
    expect(component.radioControl.disabled).toBe(true);

    component.setDisabledState(false);
    expect(component.config.disabled).toBe(false);
    expect(component.radioControl.disabled).toBe(false);
  });
});
