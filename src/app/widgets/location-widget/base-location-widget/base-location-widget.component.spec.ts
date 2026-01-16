import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseLocationWidgetComponent } from './base-location-widget.component';

describe('BaseLocationWidgetComponent', () => {
  let component: BaseLocationWidgetComponent;
  let fixture: ComponentFixture<BaseLocationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseLocationWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseLocationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
