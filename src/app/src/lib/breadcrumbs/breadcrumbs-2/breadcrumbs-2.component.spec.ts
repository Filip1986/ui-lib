import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Breadcrumbs2Component } from './breadcrumbs-2.component';
import { BreadcrumbItem } from '../models/breadcrumbs-contract';
import { provideRouter } from '@angular/router';

describe('StandardBreadcrumbsComponent', () => {
  let component: Breadcrumbs2Component;
  let fixture: ComponentFixture<Breadcrumbs2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Breadcrumbs2Component],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Breadcrumbs2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should have default separator "/"', () => {
      expect(component.separator).toBe('/');
    });

    it('should allow custom separator', () => {
      component.separator = '›';
      expect(component.separator).toBe('›');
    });

    it('should initialize with empty items array', () => {
      expect(component.items).toEqual([]);
    });

    it('should allow setting items', () => {
      const testItems: BreadcrumbItem[] = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Detail' },
      ];
      component.items = testItems;
      expect(component.items).toEqual(testItems);
    });

    it('should have null as default for homePage', () => {
      expect(component.homePage).toBeNull();
    });

    it('should allow setting homePage', () => {
      const homePageItem: BreadcrumbItem = { label: 'Home', url: '/' };
      component.homePage = homePageItem;
      expect(component.homePage).toEqual(homePageItem);
    });
  });

  describe('Rendering', () => {
    beforeEach(() => {
      const testItems: BreadcrumbItem[] = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Detail' },
      ];
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

    it('should render separator between items', () => {
      const separators = fixture.nativeElement.querySelectorAll('.breadcrumb-separator');
      expect(separators.length).toBe(2);
      expect(separators[0].textContent.trim()).toBe('/');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      const testItems: BreadcrumbItem[] = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Detail' },
      ];
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
