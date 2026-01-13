import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesChartWidget3Component } from './sales-chart-widget-3.component';

describe('SalesChartWidget3Component', () => {
  let component: SalesChartWidget3Component;
  let fixture: ComponentFixture<SalesChartWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChartWidget3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesChartWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
