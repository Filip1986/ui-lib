import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesChartWidgetFactoryComponent } from './sales-chart-widget-factory.component';

describe('SalesChartWidgetFactoryComponent', () => {
  let component: SalesChartWidgetFactoryComponent;
  let fixture: ComponentFixture<SalesChartWidgetFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesChartWidgetFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesChartWidgetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
