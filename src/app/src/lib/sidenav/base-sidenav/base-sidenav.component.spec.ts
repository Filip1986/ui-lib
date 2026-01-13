import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseSidenavComponent } from './base-sidenav.component';
import { SidenavService } from '../service/sidenav.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NavItem } from '../models/sidenav-contract';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BaseSidenavComponent', () => {
  let component: BaseSidenavComponent;
  let fixture: ComponentFixture<BaseSidenavComponent>;
  let sidenavServiceMock: Partial<SidenavService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    sidenavServiceMock = {
      expanded$: of(true),
      items$: of([]),
      toggleExpanded: jest.fn(),
      setItems: jest.fn(),
      updateItems: jest.fn(),
      setActiveItem: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(() => Promise.resolve(true)),
      isActive: jest.fn(() => false),
    };

    await TestBed.configureTestingModule({
      imports: [BaseSidenavComponent, BrowserAnimationsModule],
      providers: [
        { provide: SidenavService, useValue: sidenavServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle title input correctly', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(component.title).toBe('Test Title');
  });

  it('should handle items input correctly', () => {
    const items: NavItem[] = [{ label: 'Home', route: '/home' }];
    component.items = items;
    fixture.detectChanges();
    expect(component.items).toEqual(items);
  });

  it('should emit expandChange when toggleExpand is called', () => {
    jest.spyOn(component.expandChange, 'emit');
    component.toggleExpand();
    expect(sidenavServiceMock.toggleExpanded).toHaveBeenCalled();
    expect(component.expandChange.emit).toHaveBeenCalledWith(component.expanded);
  });

  it('should toggle item expansion when toggleItemExpand is called', () => {
    const item: NavItem = { label: 'Parent', children: [{ label: 'Child' }] };
    jest.spyOn(sidenavServiceMock, 'updateItems');
    component.toggleItemExpand(item);
    expect(sidenavServiceMock.updateItems).toHaveBeenCalled();
  });

  it('should emit itemClick and navigate when handleItemClick is called', () => {
    const item: NavItem = { label: 'Home', route: '/home' };
    jest.spyOn(component.itemClick, 'emit');
    component.handleItemClick(item);
    expect(sidenavServiceMock.setActiveItem).toHaveBeenCalledWith(item);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.itemClick.emit).toHaveBeenCalledWith(item);
  });

  it('should not navigate or emit itemClick if item is disabled', () => {
    const item: NavItem = { label: 'Home', route: '/home', disabled: true };
    jest.spyOn(component.itemClick, 'emit');
    component.handleItemClick(item);
    expect(sidenavServiceMock.setActiveItem).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(component.itemClick.emit).not.toHaveBeenCalled();
  });

  it('should check if an item is active', () => {
    const item: NavItem = { label: 'Home', route: '/home' };
    jest.spyOn(routerMock, 'isActive').mockReturnValue(true);
    expect(component.isActiveItem(item)).toBe(true);
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
