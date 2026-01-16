import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseSalesChartWidgetComponent } from './base-sales-chart-widget.component';

describe('BaseSalesChartWidgetComponent', () => {
  let component: BaseSalesChartWidgetComponent;
  let fixture: ComponentFixture<BaseSalesChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseSalesChartWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseSalesChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
