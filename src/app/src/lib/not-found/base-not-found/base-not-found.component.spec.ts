import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseNotFoundComponent } from './base-not-found.component';

describe('BaseNotFoundComponent', () => {
  let component: BaseNotFoundComponent;
  let fixture: ComponentFixture<BaseNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
