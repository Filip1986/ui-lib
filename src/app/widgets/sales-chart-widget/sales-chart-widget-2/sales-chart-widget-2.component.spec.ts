import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesChartWidget2Component } from './sales-chart-widget-2.component';

describe('SalesChartWidget2Component', () => {
  let component: SalesChartWidget2Component;
  let fixture: ComponentFixture<SalesChartWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChartWidget2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesChartWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
