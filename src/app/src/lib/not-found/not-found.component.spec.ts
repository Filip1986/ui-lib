import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { NotFoundFactoryComponent } from './not-found-factory/not-found-factory.component';
import { NotFound1Component } from './not-found-1/not-found-1.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NotFoundUtilsService } from './service/not-found-utils.service';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let debugElement: DebugElement;
  let utilsService: jasmine.SpyObj<NotFoundUtilsService>;

  // Mock data for testing
  const mockTitle = 'Custom 404 Title';
  const mockMessage = 'Custom error message';

  beforeEach(async () => {
    // Create a spy object for the NotFoundUtilsService
    const utilsServiceSpy = jasmine.createSpyObj('NotFoundUtilsService', [
      'logAnalyticsEvent',
      'searchRelatedContent',
      'generateSuggestions',
      'trackExit',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        NotFoundComponent,
        NotFoundFactoryComponent,
        NotFound1Component,
      ],
      providers: [{ provide: NotFoundUtilsService, useValue: utilsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    utilsService = TestBed.inject(NotFoundUtilsService) as jasmine.SpyObj<NotFoundUtilsService>;

    // Initialize with mock data
    component.title = mockTitle;
    component.message = mockMessage;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly validate inputs', () => {
    // Test with invalid variant
    component.variant = '4' as any;
    component.ngOnInit();
    expect(component.variant).toBe('1'); // Should fall back to default

    // Test with empty title
    component.title = '';
    component.ngOnInit();
    expect(component.title).toBe('404 - Page Not Found'); // Should use default

    // Test with empty message
    component.message = '';
    component.ngOnInit();
    expect(component.message).toBe(
      'The page you are looking for does not exist or has been moved.',
    ); // Should use default
  });

  it('should pass correct inputs to factory component', () => {
    // Find the factory component
    const factoryComponent = debugElement.query(By.directive(NotFoundFactoryComponent));
    expect(factoryComponent).toBeTruthy();

    // Check if inputs are passed correctly
    const factoryComponentInstance = factoryComponent.componentInstance;
    expect(factoryComponentInstance.title).toBe(mockTitle);
    expect(factoryComponentInstance.message).toBe(mockMessage);
    expect(factoryComponentInstance.variant).toBe('1'); // Default variant
  });

  it('should emit goHome event when onGoHome is called', () => {
    // Spy on the output event
    spyOn(component.goHome, 'emit');

    // Call the method
    component.onGoHome();

    // Verify the event was emitted
    expect(component.goHome.emit).toHaveBeenCalled();
  });

  it('should emit goBack event when onGoBack is called', () => {
    // Spy on the output event
    spyOn(component.goBack, 'emit');

    // Call the method
    component.onGoBack();

    // Verify the event was emitted
    expect(component.goBack.emit).toHaveBeenCalled();
  });

  it('should emit search event with trimmed query when onSearch is called with valid query', () => {
    // Spy on the output event
    spyOn(component.searchEvent, 'emit');

    // Call the method with a valid query
    component.onSearch(' test query ');

    // Verify the event was emitted with trimmed query
    expect(component.searchEvent.emit).toHaveBeenCalledWith('test query');
  });

  it('should not emit search event when onSearch is called with empty query', () => {
    // Spy on the output event
    spyOn(component.searchEvent, 'emit');

    // Call the method with an empty query
    component.onSearch('');

    // Verify the event was not emitted
    expect(component.searchEvent.emit).not.toHaveBeenCalled();
  });

  it('should log a warning when onSearch is called with empty query', () => {
    // Spy on console.warn
    spyOn(console, 'warn');

    // Call the method with an empty query
    component.onSearch('');

    // Verify warning was logged
    expect(console.warn).toHaveBeenCalledWith('Empty search query submitted');
  });

  describe('Component rendering based on features configuration', () => {
    it('should hide search box when showSearchBox is false', () => {
      // Configure features
      component.features = {
        showHomeLink: true,
        showBackButton: true,
        showSearchBox: false,
      };
      fixture.detectChanges();

      // Find the factory component
      const factoryComponent = debugElement.query(By.directive(NotFoundFactoryComponent));
      expect(factoryComponent.componentInstance.features.showSearchBox).toBe(false);
    });

    it('should show search box when showSearchBox is true', () => {
      // Configure features
      component.features = {
        showHomeLink: true,
        showBackButton: true,
        showSearchBox: true,
      };
      fixture.detectChanges();

      // Find the factory component
      const factoryComponent = debugElement.query(By.directive(NotFoundFactoryComponent));
      expect(factoryComponent.componentInstance.features.showSearchBox).toBe(true);
    });
  });

  describe('Integration with NotFoundUtilsService', () => {
    it('should use utils service for analytics', fakeAsync(() => {
      // Mock location
      const mockUrl = 'http://example.com/not-found-page';
      spyOnProperty(window, 'location', 'get').and.returnValue({ href: mockUrl });

      // Trigger an analytics event
      component.onGoHome();
      tick();

      // Verify service was called
      expect(utilsService.trackExit).toHaveBeenCalledWith('navigate_home', mockUrl);
    }));
  });
});
