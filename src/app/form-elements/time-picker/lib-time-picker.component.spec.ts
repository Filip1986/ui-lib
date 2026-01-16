import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibTimePickerComponent } from './lib-time-picker.component';

describe('TimePickerComponent', () => {
  let component: LibTimePickerComponent;
  let fixture: ComponentFixture<LibTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibTimePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
