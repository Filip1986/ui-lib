import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationWidget3Component } from './location-widget-3.component';

describe('LocationWidget3Component', () => {
  let component: LocationWidget3Component;
  let fixture: ComponentFixture<LocationWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationWidget3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
