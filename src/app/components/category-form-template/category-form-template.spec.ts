import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormTemplate } from './category-form-template';

describe('CategoryFormTemplate', () => {
  let component: CategoryFormTemplate;
  let fixture: ComponentFixture<CategoryFormTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFormTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFormTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
