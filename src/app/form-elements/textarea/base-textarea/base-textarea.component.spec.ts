import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTextareaComponent } from './base-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// Test-specific subclass with a template
@Component({
  selector: 'lib-test-base-textarea',
  template: `
    <textarea
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
      (keydown)="onKeydown($event)"
      (keyup)="onKeyup($event)"
    ></textarea>
  `,
})
class TestBaseTextareaComponent extends BaseTextareaComponent {}

describe('BaseTextareaComponent', () => {
  let component: TestBaseTextareaComponent;
  let fixture: ComponentFixture<TestBaseTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBaseTextareaComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestBaseTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit focusEvent on textarea focus', () => {
    jest.spyOn(component.focusEvent, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.triggerEventHandler('focus', new FocusEvent('focus'));
    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit blurEvent on textarea blur', () => {
    jest.spyOn(component.blurEvent, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));
    textarea.triggerEventHandler('blur', new FocusEvent('blur'));
    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should emit keydownEvent on textarea keydown', () => {
    jest.spyOn(component.keydownEvent, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));
    const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
    textarea.triggerEventHandler('keydown', keyEvent);
    expect(component.keydownEvent.emit).toHaveBeenCalled();
  });

  it('should emit enter event when Enter key is pressed', () => {
    jest.spyOn(component.enter, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    textarea.triggerEventHandler('keydown', enterEvent);
    expect(component.enter.emit).toHaveBeenCalled();
  });

  it('should apply configuration correctly', () => {
    component.config = {
      id: 'test-textarea',
      label: 'Description',
      required: true,
      disabled: true,
      autofocus: false,
      rows: 5,
      cols: 40,
    };
    component.applyConfiguration();
    expect(component.config.id).toBe('test-textarea');
    expect(component.config.label).toBe('Description');
    expect(component.config.required).toBe(true);
    expect(component.textareaControl.disabled).toBe(true);
    expect(component.config.rows).toBe(5);
    expect(component.config.cols).toBe(40);
  });

  it('should clear textarea value and emit clear event on clear action', () => {
    jest.spyOn(component.clear, 'emit');
    component.value = 'test value';
    component.onClear();
    expect(component.value).toBe('');
    expect(component.textareaControl.value).toBe('');
    expect(component.clear.emit).toHaveBeenCalled();
  });

  it('should handle validation message for required error', () => {
    component.textareaControl.setErrors({ required: true });
    component.touched = true;
    fixture.detectChanges();
    expect(component.validationMessage).toBe('This field is required');
  });

  it('should handle validation message for minlength error', () => {
    component.textareaControl.setErrors({ minlength: { requiredLength: 10, actualLength: 5 } });
    component.touched = true;
    fixture.detectChanges();
    expect(component.validationMessage).toBe('Please enter at least 10 characters');
  });

  it('should handle validation message for maxlength error', () => {
    component.textareaControl.setErrors({ maxlength: { requiredLength: 20, actualLength: 25 } });
    component.touched = true;
    fixture.detectChanges();
    expect(component.validationMessage).toBe('Please enter no more than 20 characters');
  });

  it('should use custom error message if provided', () => {
    component.config.errorMessage = 'Custom error message';
    component.textareaControl.setErrors({ required: true });
    component.touched = true;
    fixture.detectChanges();
    expect(component.validationMessage).toBe('Custom error message');
  });
});
