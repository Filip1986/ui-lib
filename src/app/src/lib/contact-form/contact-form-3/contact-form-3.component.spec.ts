import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactForm3Component } from './contact-form-3.component';

describe('ContactForm3Component', () => {
  let component: ContactForm3Component;
  let fixture: ComponentFixture<ContactForm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactForm3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
