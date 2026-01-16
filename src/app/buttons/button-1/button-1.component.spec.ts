import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button1Component } from './button-1.component';

describe('Button1Component', () => {
  let component: Button1Component;
  let fixture: ComponentFixture<Button1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Button1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default variant of blue', () => {
    expect(component.variant).toBe('blue');
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    expect(buttonElement.classList).toContain('variant-blue');
  });

  it('should apply variant class correctly', () => {
    component.variant = 'red';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    expect(buttonElement.classList).toContain('variant-red');
  });

  it('should apply size class correctly', () => {
    component.size = 'large';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    expect(buttonElement.classList).toContain('large');
  });

  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    expect(buttonElement.disabled).toBe(true);
  });

  it('should emit click event when button is clicked', () => {
    const spy = jest.spyOn(component.clickEvent, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit click event when button is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const spy = jest.spyOn(component.clickEvent, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    buttonElement.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should show left icon when iconPosition is left', () => {
    component.icon = 'pi-check';
    component.iconPosition = 'left';
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.icon-left');
    expect(iconElement).toBeTruthy();
    expect(iconElement.classList).toContain('pi-check');
  });

  it('should show right icon when iconPosition is right', () => {
    component.icon = 'pi-arrow-right';
    component.iconPosition = 'right';
    fixture.detectChanges();
    const iconElement = fixture.nativeElement.querySelector('.icon-right');
    expect(iconElement).toBeTruthy();
    expect(iconElement.classList).toContain('pi-arrow-right');
  });

  it('should add rounded class when rounded is true', () => {
    component.rounded = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    expect(buttonElement.classList).toContain('rounded');
  });

  it('should add animate class when animate is true', () => {
    component.animate = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    expect(buttonElement.classList).toContain('animate');
  });

  it('should have correct type attribute', () => {
    component.type = 'submit';
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.action-button');
    expect(buttonElement.type).toBe('submit');
  });
});
