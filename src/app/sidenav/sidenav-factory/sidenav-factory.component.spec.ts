import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavFactoryComponent } from './sidenav-factory.component';
import { Sidenav1Component } from '../sidenav-1/sidenav-1.component';
import { Sidenav2Component } from '../sidenav-2/sidenav-2.component';
import { Sidenav3Component } from '../sidenav-3/sidenav-3.component';
import { NavItem, SidenavVariant } from '../models/sidenav-contract';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SidenavFactoryComponent', () => {
  let component: SidenavFactoryComponent;
  let fixture: ComponentFixture<SidenavFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavFactoryComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Sidenav1Component when variant is "1"', () => {
    component.variant = '1';
    fixture.detectChanges();
    const sidenav1 = fixture.debugElement.query(By.directive(Sidenav1Component));
    expect(sidenav1).toBeTruthy();
  });

  it('should render Sidenav3Component when variant is "2"', () => {
    component.variant = '2';
    fixture.detectChanges();
    const sidenav3 = fixture.debugElement.query(By.directive(Sidenav3Component));
    expect(sidenav3).toBeTruthy();
  });

  it('should render Sidenav2Component by default when variant is not "1" or "2"', () => {
    component.variant = 'unknown' as SidenavVariant;
    fixture.detectChanges();
    const sidenav2 = fixture.debugElement.query(By.directive(Sidenav2Component));
    expect(sidenav2).toBeTruthy();
  });

  it('should pass inputs to the child component', () => {
    const items: NavItem[] = [{ label: 'Home', route: '/home' }];
    component.items = items;
    component.expanded = false;
    component.logo = 'logo.png';
    component.title = 'Test Title';
    component.isBetaTester = true;
    component.variant = '1';
    fixture.detectChanges();

    const sidenav1 = fixture.debugElement.query(By.directive(Sidenav1Component))
      .componentInstance as Sidenav1Component;
    expect(sidenav1.items).toEqual(items);
    expect(sidenav1.expanded).toBe(false);
    expect(sidenav1.logo).toBe('logo.png');
    expect(sidenav1.title).toBe('Test Title');
    expect(sidenav1.isBetaTester).toBe(true);
  });

  it('should emit itemClick when onItemClick is called', () => {
    jest.spyOn(component.itemClick, 'emit');
    const item: NavItem = { label: 'Home', route: '/home' };
    component.onItemClick(item);
    expect(component.itemClick.emit).toHaveBeenCalledWith(item);
  });

  it('should emit expandChange when onExpandChange is called', () => {
    jest.spyOn(component.expandChange, 'emit');
    component.onExpandChange(false);
    expect(component.expandChange.emit).toHaveBeenCalledWith(false);
  });
});
