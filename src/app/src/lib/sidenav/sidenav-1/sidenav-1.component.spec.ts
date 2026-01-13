import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidenav1Component } from './sidenav-1.component';
import { SidenavService } from '../service/sidenav.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NavItem } from '../models/sidenav-contract';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Sidenav1Component', () => {
  let component: Sidenav1Component;
  let fixture: ComponentFixture<Sidenav1Component>;
  let sidenavServiceMock: Partial<SidenavService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    sidenavServiceMock = {
      items$: of([]),
      isMobile$: of(false),
      isMobileSidenavOpen$: of(false),
      expanded$: of(false),
      toggleExpanded: jest.fn(),
      closeMobileSidenav: jest.fn(),
      openMobileSidenav: jest.fn(),
      updateItems: jest.fn(),
      setActiveItem: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(() => Promise.resolve(true)),
    };

    await TestBed.configureTestingModule({
      imports: [Sidenav1Component, NoopAnimationsModule],
      providers: [
        { provide: SidenavService, useValue: sidenavServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidenav1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to items$ on init', () => {
    const items: NavItem[] = [{ label: 'Home', route: '/home' }];
    sidenavServiceMock.items$ = of(items);
    component.ngOnInit();
    expect(component.items).toEqual(items);
  });

  it('should unsubscribe from items$ on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['itemsSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should toggle expand state for desktop', () => {
    jest.spyOn(sidenavServiceMock, 'toggleExpanded');
    component.toggleExpand();
    expect(sidenavServiceMock.toggleExpanded).toHaveBeenCalled();
  });

  it('should open mobile sidenav if closed', () => {
    sidenavServiceMock.isMobile$ = of(true);
    sidenavServiceMock.isMobileSidenavOpen$ = of(false);
    jest.spyOn(sidenavServiceMock, 'openMobileSidenav');
    component.toggleExpand();
    expect(sidenavServiceMock.openMobileSidenav).toHaveBeenCalled();
  });

  it('should close mobile sidenav if open', () => {
    sidenavServiceMock.isMobile$ = of(true);
    sidenavServiceMock.isMobileSidenavOpen$ = of(true);
    jest.spyOn(sidenavServiceMock, 'closeMobileSidenav');
    component.toggleExpand();
    expect(sidenavServiceMock.closeMobileSidenav).toHaveBeenCalled();
  });

  it('should update item expanded state when toggleItemExpand is called', () => {
    const item: NavItem = { label: 'Parent', children: [{ label: 'Child' }] };
    jest.spyOn(sidenavServiceMock, 'updateItems');
    component.toggleItemExpand(item);
    expect(sidenavServiceMock.updateItems).toHaveBeenCalled();
  });

  it('should handle item click for items without children', () => {
    const item: NavItem = { label: 'Home', route: '/home' };
    jest.spyOn(component.itemClick, 'emit');
    component.handleItemClick(item);
    expect(sidenavServiceMock.setActiveItem).toHaveBeenCalledWith(item);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.itemClick.emit).toHaveBeenCalledWith(item);
  });

  it('should toggle item expand for items with children', () => {
    const item: NavItem = { label: 'Parent', children: [{ label: 'Child' }] };
    jest.spyOn(component, 'toggleItemExpand');
    component.handleItemClick(item);
    expect(component.toggleItemExpand).toHaveBeenCalledWith(item);
  });

  it('should return tooltip text when sidenav is collapsed', () => {
    component.expanded = false;
    const tooltip = component.getTooltip('Test Label');
    expect(tooltip).toBe('Test Label');
  });

  it('should return empty tooltip text when sidenav is expanded', () => {
    component.expanded = true;
    const tooltip = component.getTooltip('Test Label');
    expect(tooltip).toBe('');
  });
});
