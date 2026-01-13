import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibSelectButtonComponent } from './lib-select-button.component';

describe('SelectButtonComponent', () => {
  let component: LibSelectButtonComponent;
  let fixture: ComponentFixture<LibSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibSelectButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
