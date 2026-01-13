import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCard3Component } from './article-card-3.component';

describe('ArticleCard3Component', () => {
  let component: ArticleCard3Component;
  let fixture: ComponentFixture<ArticleCard3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCard3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
