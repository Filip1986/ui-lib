import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidenav3Component } from './sidenav-3.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModernSidenavComponent', () => {
  let component: Sidenav3Component;
  let fixture: ComponentFixture<Sidenav3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidenav3Component, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidenav3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
