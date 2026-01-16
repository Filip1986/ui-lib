import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundFactoryComponent } from './not-found-factory.component';

describe('NotFoundFactoryComponent', () => {
  let component: NotFoundFactoryComponent;
  let fixture: ComponentFixture<NotFoundFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
