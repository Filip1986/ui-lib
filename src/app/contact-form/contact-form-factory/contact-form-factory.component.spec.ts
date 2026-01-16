import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactFormFactoryComponent } from './contact-form-factory.component';

describe('ContactFormFactoryComponent', () => {
  let component: ContactFormFactoryComponent;
  let fixture: ComponentFixture<ContactFormFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFormFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
