import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibInputTextComponent } from './lib-input-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputTextComponent', () => {
  let component: LibInputTextComponent;
  let fixture: ComponentFixture<LibInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LibInputTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value and emit valueChange on input change', () => {
    jest.spyOn(component.valueChange, 'emit');
    const input = fixture.debugElement.query(By.css('input'));

    // Simulate user input
    input.nativeElement.value = 'test value';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert value and event emission
    expect(component.value).toBe('test value');
    expect(component.valueChange.emit).toHaveBeenCalledWith('test value');
  });

  it('should emit focusEvent on input focus', () => {
    jest.spyOn(component.focusEvent, 'emit');
    const input = fixture.debugElement.query(By.css('input'));

    // Simulate focus event
    input.nativeElement.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    expect(component.focusEvent.emit).toHaveBeenCalled();
  });

  it('should emit blurEvent on input blur', () => {
    jest.spyOn(component.blurEvent, 'emit');
    const input = fixture.debugElement.query(By.css('input'));

    // Simulate blur event
    input.nativeElement.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(component.blurEvent.emit).toHaveBeenCalled();
  });

  it('should disable input when disabled is set to true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.disabled).toBe(true);
  });

  it('should apply placeholder from config', () => {
    component.placeholder = 'Enter text';
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.placeholder).toBe('Enter text');
  });
});
