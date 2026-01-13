import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseListBoxComponent } from './base-list-box.component';

describe('BaseListboxComponent', () => {
  let component: BaseListBoxComponent;
  let fixture: ComponentFixture<BaseListBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseListBoxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseListBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
