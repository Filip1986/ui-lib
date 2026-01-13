import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm2Component } from './contact-form-2.component';

describe('ContactForm2Component', () => {
  let component: ContactForm2Component;
  let fixture: ComponentFixture<ContactForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
