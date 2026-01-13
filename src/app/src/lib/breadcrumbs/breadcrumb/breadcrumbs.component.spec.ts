import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { BreadcrumbItem, BreadcrumbVariant } from '../models/breadcrumbs-contract';

@Component({
  template: '<lib-breadcrumbs [items]="testItems" [variant]="testVariant"></lib-breadcrumbs>',
})
class TestHostComponent {
  testItems: BreadcrumbItem[] = [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Detail' },
  ];
  testVariant: BreadcrumbVariant = 'standard';
}

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent, RouterTestingModule],
      declarations: [TestHostComponent],
    }).compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(BreadcrumbsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have default variant as standard', () => {
      expect(component.variant).toBe('standard');
    });

    it('should allow variant to be changed', () => {
      component.variant = 'styled';
      expect(component.variant).toBe('styled');
    });

    it('should have default separator as "/"', () => {
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
      const testItems: BreadcrumbItem[] = [{ label: 'Test', url: '/test' }];
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

  describe('Variant Rendering', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('should render standard variant by default', () => {
      hostComponent.testVariant = 'standard';
      hostFixture.detectChanges();
      const breadcrumbsElement = hostFixture.nativeElement.querySelector('lib-breadcrumbs-2');
      expect(breadcrumbsElement).toBeTruthy();
    });

    it('should render styled variant', () => {
      hostComponent.testVariant = 'styled';
      hostFixture.detectChanges();
      const breadcrumbsElement = hostFixture.nativeElement.querySelector('lib-breadcrumbs-3');
      expect(breadcrumbsElement).toBeTruthy();
    });

    it('should render minimal variant', () => {
      hostComponent.testVariant = 'minimal';
      hostFixture.detectChanges();
      const breadcrumbsElement = hostFixture.nativeElement.querySelector('lib-breadcrumbs-1');
      expect(breadcrumbsElement).toBeTruthy();
    });
  });
});
