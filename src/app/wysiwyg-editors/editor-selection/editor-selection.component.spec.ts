import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorSelectionComponent } from './editor-selection.component';

describe('EditorSelectionComponent', () => {
  let component: EditorSelectionComponent;
  let fixture: ComponentFixture<EditorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorSelectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
