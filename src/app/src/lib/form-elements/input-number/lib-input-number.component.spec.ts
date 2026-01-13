import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibInputNumberComponent } from './lib-input-number.component';

describe('InputNumberComponent', () => {
  let component: LibInputNumberComponent;
  let fixture: ComponentFixture<LibInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibInputNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
