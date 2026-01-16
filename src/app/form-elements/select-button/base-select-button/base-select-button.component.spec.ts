import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseSelectButtonComponent } from './base-select-button.component';

describe('BaseSelectButtonComponent', () => {
  let component: BaseSelectButtonComponent;
  let fixture: ComponentFixture<BaseSelectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseSelectButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseSelectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
