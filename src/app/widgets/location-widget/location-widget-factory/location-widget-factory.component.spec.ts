import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationWidgetFactoryComponent } from './location-widget-factory.component';

describe('LocationWidgetFactoryComponent', () => {
  let component: LocationWidgetFactoryComponent;
  let fixture: ComponentFixture<LocationWidgetFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationWidgetFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationWidgetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
