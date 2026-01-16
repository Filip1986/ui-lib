import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseMultiselectComponent } from './base-multiselect.component';

describe('BaseMultiselectComponent', () => {
  let component: BaseMultiselectComponent;
  let fixture: ComponentFixture<BaseMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseMultiselectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
