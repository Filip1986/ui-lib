import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavFooter2Component } from './sidenav-footer-2.component';

describe('SidenavFooter2Component', () => {
  let component: SidenavFooter2Component;
  let fixture: ComponentFixture<SidenavFooter2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFooter2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavFooter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
