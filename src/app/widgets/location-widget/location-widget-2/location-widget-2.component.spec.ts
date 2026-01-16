import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationWidget2Component } from './location-widget-2.component';

describe('LocationWidget2Component', () => {
  let component: LocationWidget2Component;
  let fixture: ComponentFixture<LocationWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationWidget2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
