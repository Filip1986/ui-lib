import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibTextareaComponent } from './lib-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TextareaComponent', () => {
  let component: LibTextareaComponent;
  let fixture: ComponentFixture<LibTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LibTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value and emit valueChange on textarea change', () => {
    jest.spyOn(component.valueChange, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));

    // Simulate user input
    textarea.nativeElement.value = 'test value';
    textarea.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert value and event emission
    expect(component.value).toBe('test value');
    expect(component.valueChange.emit).toHaveBeenCalledWith('test value');
  });

  it('should emit focusEvent on textarea focus', () => {
    jest.spyOn(component.focusEvent, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));

    // Simulate focus event
    textarea.nativeElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit blurEvent on textarea blur', () => {
    jest.spyOn(component.blurEvent, 'emit');
    const textarea = fixture.debugElement.query(By.css('textarea'));

    // Simulate blur event
    textarea.nativeElement.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should disable textarea when disabled is set to true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea'));
    expect(textarea.nativeElement.disabled).toBe(true);
  });

  it('should apply placeholder from config', () => {
    component.placeholder = 'Enter description';
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea'));
    expect(textarea.nativeElement.placeholder).toBe('Enter description');
  });

  it('should set rows from config', () => {
    component.rows = 5;
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea'));
    expect(textarea.nativeElement.rows).toBe(5);
  });

  it('should set cols from config', () => {
    component.cols = 40;
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea'));
    expect(textarea.nativeElement.cols).toBe(40);
  });
});
