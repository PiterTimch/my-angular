import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {environment} from '../../../environments/environment';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import slugify from 'slugify';

@Component({
  selector: 'app-category-form-template',
  standalone: true,
  imports: [KeyValuePipe, NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: './category-form-template.html',
  styleUrls: ['./category-form-template.css']
})
export class CategoryFormTemplate implements OnInit {
  @Input() title = 'Create';
  @Input() slug: string | null = null;
  @Input() imagePreview: string | ArrayBuffer | null = null;

  @Output() formSubmit = new EventEmitter<FormGroup>();

  categoryForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', this.requiredMessage('Назва є обов\'язковою')],
      slug: ['', this.requiredMessage('Slug є обов\'язковим')],
      imageFile: null
    });
  }

  ngOnInit() {
    if (this.slug) {
      this.categoryService.getCategoryBySlug(this.slug).subscribe(category => {
        if (category.image)
          this.imagePreview = `${environment.imagePath}/800_${category.image}`;

        this.categoryForm.patchValue({
          id: category.id,
          name: category.name,
          slug: category.slug
        });
      });
    }

    this.categoryForm.get('name')?.valueChanges.subscribe(nameValue => {
      if (!this.slug) {
        const generatedSlug = slugify(nameValue || '', {
          lower: true,
          strict: true,
          locale: 'uk'
        });
        this.categoryForm.get('slug')?.setValue(generatedSlug, { emitEvent: false });
      }
    });
  }

  requiredMessage(message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value ? { message } : null;
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Можна завантажувати лише зображення';
        return;
      }
      this.categoryForm.patchValue({ imageFile: file });
      this.imagePreview = URL.createObjectURL(file);
    } else {
      this.categoryForm.patchValue({ imageFile: null });
      this.imagePreview = null;
    }
  }
}
