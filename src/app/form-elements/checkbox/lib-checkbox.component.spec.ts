import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibCheckboxComponent } from './lib-checkbox.component';

describe('CheckboxComponent', () => {
  let component: LibCheckboxComponent;
  let fixture: ComponentFixture<LibCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
