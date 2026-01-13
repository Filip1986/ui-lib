import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseBreadcrumbsComponent } from './base-breadcrumbs.component';
import { BreadcrumbItem } from '../models/breadcrumbs-contract';

describe('BaseBreadcrumbsComponent', () => {
  let component: BaseBreadcrumbsComponent;
  let fixture: ComponentFixture<BaseBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseBreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not modify items if no homePage is provided', () => {
      const initialItems: BreadcrumbItem[] = [
        { label: 'Page 1', url: '/page1' },
        { label: 'Page 2', url: '/page2' },
      ];
      component.items = [...initialItems];
      component.homePage = null;
      component.ngOnInit();

      expect(component.items).toEqual(initialItems);
    });

    it('should prepend homePage to items when homePage is provided', () => {
      const initialItems: BreadcrumbItem[] = [
        { label: 'Page 1', url: '/page1' },
        { label: 'Page 2', url: '/page2' },
      ];
      const homePage: BreadcrumbItem = { label: 'Home', url: '/' };

      component.items = [...initialItems];
      component.homePage = homePage;
      component.ngOnInit();

      expect(component.items).toEqual([homePage, ...initialItems]);
    });

    it('should handle homePage with minimal properties', () => {
      const initialItems: BreadcrumbItem[] = [{ label: 'Page 1', url: '/page1' }];
      const homePage: BreadcrumbItem = { label: 'Home' };

      component.items = [...initialItems];
      component.homePage = homePage;
      component.ngOnInit();

      expect(component.items).toEqual([homePage, ...initialItems]);
    });

    it('should not mutate original items array', () => {
      const initialItems: BreadcrumbItem[] = [{ label: 'Page 1', url: '/page1' }];
      const homePage: BreadcrumbItem = { label: 'Home', url: '/' };

      const originalItems = [...initialItems];

      component.items = initialItems;
      component.homePage = homePage;
      component.ngOnInit();

      expect(originalItems).toEqual([{ label: 'Page 1', url: '/page1' }]);
      expect(component.items).toEqual([homePage, ...originalItems]);
    });

    it('should handle multiple items with homePage', () => {
      const initialItems: BreadcrumbItem[] = [
        { label: 'Products', url: '/products' },
        { label: 'Electronics', url: '/products/electronics' },
        { label: 'Smartphones' },
      ];
      const homePage: BreadcrumbItem = { label: 'Home', url: '/' };

      component.items = [...initialItems];
      component.homePage = homePage;
      component.ngOnInit();

      expect(component.items).toEqual([homePage, ...initialItems]);
    });

    it('should handle empty items array with homePage', () => {
      const homePage: BreadcrumbItem = { label: 'Home', url: '/' };

      component.items = [];
      component.homePage = homePage;
      component.ngOnInit();

      expect(component.items).toEqual([homePage]);
    });
  });
});
