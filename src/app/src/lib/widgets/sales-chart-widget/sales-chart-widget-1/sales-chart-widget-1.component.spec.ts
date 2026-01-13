import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesChartWidget1Component } from './sales-chart-widget-1.component';

describe('SalesChartWidget1Component', () => {
  let component: SalesChartWidget1Component;
  let fixture: ComponentFixture<SalesChartWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChartWidget1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesChartWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
