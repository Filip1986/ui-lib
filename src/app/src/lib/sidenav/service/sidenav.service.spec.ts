import { TestBed } from '@angular/core/testing';
import { SidenavService } from './sidenav.service';
import { NavItem } from '../models/sidenav-contract';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavService);

    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize expanded state from localStorage', () => {
    localStorage.setItem('sidenav_expanded', 'false');
    const newService = TestBed.inject(SidenavService);
    newService.expanded$.subscribe((expanded) => {
      expect(expanded).toBe(false);
    });
  });

  it('should toggle expanded state', () => {
    service.expanded$.subscribe((expanded) => {
      expect(expanded).toBe(true);
    });
    service.toggleExpanded();
    service.expanded$.subscribe((expanded) => {
      expect(expanded).toBe(false);
    });
  });

  it('should set and get items correctly', () => {
    const items: NavItem[] = [{ label: 'Home', route: '/home' }];
    service.setItems(items);
    service.items$.subscribe((currentItems) => {
      expect(currentItems).toEqual(items);
    });
  });

  it('should update items using a callback', () => {
    const items: NavItem[] = [{ label: 'Home', route: '/home' }];
    service.setItems(items);
    service.updateItems((currentItems) =>
      currentItems.map((item) => ({ ...item, label: 'Updated Home' })),
    );
    service.items$.subscribe((updatedItems) => {
      expect(updatedItems[0].label).toBe('Updated Home');
    });
  });

  it('should set and clear active item', () => {
    const item: NavItem = { label: 'Home', route: '/home' };
    service.setActiveItem(item);
    service.activeItem$.subscribe((activeItem) => {
      expect(activeItem).toEqual(item);
    });
    service.clearActiveItem();
    service.activeItem$.subscribe((activeItem) => {
      expect(activeItem).toBeNull();
    });
  });

  // it('should handle mobile view detection', () => {
  //   jest.spyOn(window, 'innerWidth', 'get').mockReturnValue(500);
  //   service['checkMobileView']();
  //   service.isMobile$.subscribe((isMobile) => {
  //     expect(isMobile).toBe(true);
  //   });
  // });

  it('should expand and collapse all items', () => {
    const items: NavItem[] = [{ label: 'Parent', children: [{ label: 'Child', expanded: false }] }];
    service.setItems(items);
    service.expandAll();
    service.items$.subscribe((updatedItems) => {
      expect(updatedItems[0].children![0].expanded).toBe(true);
    });
    service.collapseAll();
    service.items$.subscribe((updatedItems) => {
      expect(updatedItems[0].children![0].expanded).toBe(false);
    });
  });

  it('should save and restore expanded items from localStorage', () => {
    const items: NavItem[] = [
      { label: 'Parent', expanded: true, children: [{ label: 'Child', expanded: true }] },
    ];
    service.setItems(items);
    const newService = TestBed.inject(SidenavService);
    newService.items$.subscribe((restoredItems) => {
      expect(restoredItems[0].expanded).toBe(true);
      expect(restoredItems[0].children![0].expanded).toBe(true);
    });
  });
});
