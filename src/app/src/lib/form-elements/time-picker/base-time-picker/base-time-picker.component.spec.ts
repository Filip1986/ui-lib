import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTimePickerComponent } from './base-time-picker.component';

describe('BaseTimePickerComponent', () => {
  let component: BaseTimePickerComponent;
  let fixture: ComponentFixture<BaseTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseTimePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
