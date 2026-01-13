import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseArticleCardComponent } from './base-article-card.component';

describe('BaseArticleCardComponent', () => {
  let component: BaseArticleCardComponent;
  let fixture: ComponentFixture<BaseArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseArticleCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
