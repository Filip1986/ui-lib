import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibDatePickerComponent } from './lib-date-picker.component';

describe('DatePickerComponent', () => {
  let component: LibDatePickerComponent;
  let fixture: ComponentFixture<LibDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
