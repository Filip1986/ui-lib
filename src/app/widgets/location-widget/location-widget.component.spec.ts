import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationWidgetComponent } from './location-widget.component';

describe('LocationWidgetComponent', () => {
  let component: LocationWidgetComponent;
  let fixture: ComponentFixture<LocationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
