import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseInputTextComponent } from './base-input-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { InputIconModule } from 'primeng/inputicon';

// Test-specific subclass with a template
@Component({
  selector: 'lib-test-base-input-text',
  template: `
    <input (focus)="onFocus($event)" (blur)="onBlur($event)" />
    <p-inputicon (click)="onIconClick($event)"></p-inputicon>
  `,
})
class TestBaseInputTextComponent extends BaseInputTextComponent {}

describe('BaseInputTextComponent', () => {
  let component: TestBaseInputTextComponent;
  let fixture: ComponentFixture<TestBaseInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBaseInputTextComponent],
      imports: [ReactiveFormsModule, InputIconModule], // Add InputIconModule here
    }).compileComponents();

    fixture = TestBed.createComponent(TestBaseInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit focusEvent on input focus', () => {
    jest.spyOn(component.focusEvent, 'emit');
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('focus', new FocusEvent('focus'));
    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit blurEvent on input blur', () => {
    jest.spyOn(component.blurEvent, 'emit');
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('blur', new FocusEvent('blur'));
    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should emit iconClick on icon click', () => {
    jest.spyOn(component.iconClick, 'emit');
    component.config = {
      type: 'search',
      icon: 'search-icon',
      required: false,
      disabled: false,
      autofocus: false,
    };
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('p-inputicon'));
    icon.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.iconClick.emit).toHaveBeenCalled();
  });

  it('should apply configuration correctly', () => {
    component.config = {
      id: 'test-input',
      type: 'email',
      label: 'Email',
      required: true,
      disabled: true,
      autofocus: false,
    };
    component.applyConfiguration();
    expect(component.config.id).toBe('test-input');
    expect(component.config.type).toBe('email');
    expect(component.config.label).toBe('Email');
    expect(component.config.required).toBe(true);
    expect(component.inputControl.disabled).toBe(true);
  });

  it('should clear input value and emit clear event on clear action', () => {
    jest.spyOn(component.clear, 'emit');
    component.value = 'test value';
    component.onClear();
    expect(component.value).toBe('');
    expect(component.inputControl.value).toBe('');
    expect(component.clear.emit).toHaveBeenCalled();
  });
});
