import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavFooterFactoryComponent } from './sidenav-footer-factory.component';

describe('SidenavFooterFactoryComponent', () => {
  let component: SidenavFooterFactoryComponent;
  let fixture: ComponentFixture<SidenavFooterFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFooterFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavFooterFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
