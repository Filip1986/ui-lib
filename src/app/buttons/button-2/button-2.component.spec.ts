import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button2Component } from './button-2.component';

describe('Button2Component', () => {
  let component: Button2Component;
  let fixture: ComponentFixture<Button2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Button2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply position class correctly', () => {
    component.position = 'right';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.btn');
    expect(element.classList).toContain('right');
  });

  it('should apply variant class correctly', () => {
    component.variant = 'arrow';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.btn');
    expect(element.classList).toContain('variant-arrow');
  });

  it('should apply color class correctly', () => {
    component.color = 'blue';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.btn');
    expect(element.classList).toContain('variant-blue');
  });

  it('should apply size class correctly', () => {
    component.size = 'large';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.btn');
    expect(element.classList).toContain('btn-large');
  });

  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.btn');
    expect(element.classList).toContain('disabled');
  });

  it('should emit click event when button is clicked', () => {
    const spy = jest.spyOn(component.clickEvent, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('.btn');
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit click event when button is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const spy = jest.spyOn(component.clickEvent, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('.btn');
    buttonElement.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should set href attribute when provided', () => {
    component.href = 'https://example.com';
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.btn');
    expect(element.getAttribute('href')).toBe('https://example.com');
  });
});
