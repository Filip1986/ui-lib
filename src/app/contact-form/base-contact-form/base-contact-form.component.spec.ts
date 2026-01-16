import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseContactFormComponent } from './base-contact-form.component';

describe('BaseContactFormComponent', () => {
  let component: BaseContactFormComponent;
  let fixture: ComponentFixture<BaseContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseContactFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
