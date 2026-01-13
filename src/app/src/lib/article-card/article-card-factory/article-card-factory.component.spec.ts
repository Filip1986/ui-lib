import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleCardFactoryComponent } from './article-card-factory.component';

describe('ArticleCardFactoryComponent', () => {
  let component: ArticleCardFactoryComponent;
  let fixture: ComponentFixture<ArticleCardFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardFactoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleCardFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
