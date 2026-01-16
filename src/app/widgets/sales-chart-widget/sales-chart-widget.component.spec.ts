import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesChartWidgetComponent } from './sales-chart-widget.component';

describe('SalesChartWidgetComponent', () => {
  let component: SalesChartWidgetComponent;
  let fixture: ComponentFixture<SalesChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChartWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
