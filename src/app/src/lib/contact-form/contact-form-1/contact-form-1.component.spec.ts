import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm1Component } from './contact-form-1.component';

describe('ContactForm1Component', () => {
  let component: ContactForm1Component;
  let fixture: ComponentFixture<ContactForm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
