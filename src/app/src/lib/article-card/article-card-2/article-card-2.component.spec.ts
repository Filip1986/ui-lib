import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCard2Component } from './article-card-2.component';

describe('ArticleCard2Component', () => {
  let component: ArticleCard2Component;
  let fixture: ComponentFixture<ArticleCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCard2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
