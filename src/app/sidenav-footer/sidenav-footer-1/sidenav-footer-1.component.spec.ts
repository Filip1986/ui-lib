import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavFooter1Component } from './sidenav-footer-1.component';

describe('SidenavFooter1Component', () => {
  let component: SidenavFooter1Component;
  let fixture: ComponentFixture<SidenavFooter1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFooter1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavFooter1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
