import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseSidenavFooterComponent } from './base-sidenav-footer.component';

describe('BaseSidenavFooterComponent', () => {
  let component: BaseSidenavFooterComponent;
  let fixture: ComponentFixture<BaseSidenavFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseSidenavFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseSidenavFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
