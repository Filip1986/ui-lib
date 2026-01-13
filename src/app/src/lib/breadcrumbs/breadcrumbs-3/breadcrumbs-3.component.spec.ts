import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Breadcrumbs3Component } from './breadcrumbs-3.component';
import { BreadcrumbItem } from '../models/breadcrumbs-contract';
import { provideRouter } from '@angular/router';

describe('StyledBreadcrumbsComponent', () => {
  let component: Breadcrumbs3Component;
  let fixture: ComponentFixture<Breadcrumbs3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumbs3Component],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumbs3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should initialize with empty items array', () => {
      expect(component.items).toEqual([]);
    });

    it('should allow setting items', () => {
      const testItems: BreadcrumbItem[] = [
        { label: 'Home', url: '/', icon: 'pi pi-home' },
        { label: 'Products', url: '/products', icon: 'pi pi-shopping-bag' },
        { label: 'Detail', icon: 'pi pi-info-circle' },
      ];
      component.items = testItems;
      expect(component.items).toEqual(testItems);
    });

    it('should have null as default for homePage', () => {
      expect(component.homePage).toBeNull();
    });

    it('should allow setting homePage', () => {
      const homePageItem: BreadcrumbItem = { label: 'Home', url: '/', icon: 'pi pi-home' };
      component.homePage = homePageItem;
      expect(component.homePage).toEqual(homePageItem);
    });
  });

  describe('Rendering', () => {
    const testItems: BreadcrumbItem[] = [
      { label: 'Home', url: '/', icon: 'pi pi-home' },
      { label: 'Products', url: '/products', icon: 'pi pi-shopping-bag' },
      { label: 'Detail', icon: 'pi pi-info-circle' },
    ];

    beforeEach(() => {
      component.items = testItems;
      fixture.detectChanges();
    });

    it('should render correct number of breadcrumb items', () => {
      const breadcrumbItems = fixture.nativeElement.querySelectorAll('.breadcrumb-item');
      expect(breadcrumbItems.length).toBe(3);
    });

    it('should render links for non-last items', () => {
      const links = fixture.nativeElement.querySelectorAll('.breadcrumb-link');
      expect(links.length).toBe(2);
    });

    it('should render last item as text', () => {
      const lastItem = fixture.nativeElement.querySelector('.breadcrumb-current');
      expect(lastItem.textContent.trim()).toBe('Detail');
    });

    it('should render icons for items', () => {
      const icons = fixture.nativeElement.querySelectorAll('.icon');
      expect(icons.length).toBe(3);
      expect(icons[0].classList).toContain('pi-home');
      expect(icons[1].classList).toContain('pi-shopping-bag');
      expect(icons[2].classList).toContain('pi-info-circle');
    });

    it('should render separator icons', () => {
      const separatorIcons = fixture.nativeElement.querySelectorAll('.separator-icon');
      expect(separatorIcons.length).toBe(2);
      expect(separatorIcons[0].classList).toContain('pi-angle-right');
    });
  });

  describe('Accessibility', () => {
    const testItems: BreadcrumbItem[] = [
      { label: 'Home', url: '/', icon: 'pi pi-home' },
      { label: 'Products', url: '/products', icon: 'pi pi-shopping-bag' },
      { label: 'Detail', icon: 'pi pi-info-circle' },
    ];

    beforeEach(() => {
      component.items = testItems;
      fixture.detectChanges();
    });

    it('should have correct aria-current on last item', () => {
      const lastItem = fixture.nativeElement.querySelector('[aria-current="page"]');
      expect(lastItem).toBeTruthy();
      expect(lastItem.textContent.trim()).toBe('Detail');
    });

    it('should have nav element with aria-label', () => {
      const nav = fixture.nativeElement.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    });
  });
});
