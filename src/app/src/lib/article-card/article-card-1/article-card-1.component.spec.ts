import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCard1Component } from './article-card-1.component';

describe('ArticleCard1Component', () => {
  let component: ArticleCard1Component;
  let fixture: ComponentFixture<ArticleCard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCard1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
