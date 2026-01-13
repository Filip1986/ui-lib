import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CkeditorEditorComponent } from './ckeditor-editor.component';

describe('CkeditorEditorComponent', () => {
  let component: CkeditorEditorComponent;
  let fixture: ComponentFixture<CkeditorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CkeditorEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CkeditorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
