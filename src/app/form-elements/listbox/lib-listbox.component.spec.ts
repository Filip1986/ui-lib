import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibListboxComponent } from './lib-listbox.component';

describe('ListboxComponent', () => {
  let component: LibListboxComponent;
  let fixture: ComponentFixture<LibListboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibListboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
