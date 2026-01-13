import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavFooter3Component } from './sidenav-footer-3.component';

describe('SidenavFooter3Component', () => {
  let component: SidenavFooter3Component;
  let fixture: ComponentFixture<SidenavFooter3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFooter3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavFooter3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
