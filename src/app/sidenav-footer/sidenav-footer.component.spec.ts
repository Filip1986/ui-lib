import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavFooterComponent } from './sidenav-footer.component';

describe('SidenavFooterComponent', () => {
  let component: SidenavFooterComponent;
  let fixture: ComponentFixture<SidenavFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
