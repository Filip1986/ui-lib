import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationWidget1Component } from './location-widget-1.component';

describe('LocationWidget1Component', () => {
  let component: LocationWidget1Component;
  let fixture: ComponentFixture<LocationWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationWidget1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
