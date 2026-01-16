import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { SidenavService } from './service/sidenav.service';
import { of } from 'rxjs';
import { NavItem } from './models/sidenav-contract';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let sidenavServiceMock: Partial<SidenavService>;

  beforeEach(async () => {
    sidenavServiceMock = {
      expanded$: of(true),
      items$: of([]), // Mock items$ as an observable
      setItems: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [SidenavComponent, NoopAnimationsModule],
      providers: [{ provide: SidenavService, useValue: sidenavServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize expanded state from SidenavService', () => {
    expect(component.expanded).toBe(true);
  });

  it('should set items in SidenavService if items input is provided', () => {
    const items: NavItem[] = [{ label: 'Home', route: '/home' }];
    component.items = items;
    component.ngOnInit();
    expect(sidenavServiceMock.setItems).toHaveBeenCalledWith(items);
  });

  it('should emit itemClick when onItemClick is called', () => {
    const item: NavItem = { label: 'Home', route: '/home' };
    jest.spyOn(component.itemClick, 'emit');
    component.onItemClick(item);
    expect(component.itemClick.emit).toHaveBeenCalledWith(item);
  });

  it('should emit expandChange when onExpandChange is called', () => {
    jest.spyOn(component.expandChange, 'emit');
    component.onExpandChange(false);
    expect(component.expandChange.emit).toHaveBeenCalledWith(false);
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
