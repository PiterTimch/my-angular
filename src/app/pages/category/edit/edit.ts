import { Component } from '@angular/core';
import { ICategoryCreate } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {serialize} from 'object-to-formdata';
import {ErrorUtils} from '../../../utils/ErrorUtils';

@Component({
  selector: 'app-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class CategoryEdit {
  category: ICategoryCreate = { name: '', slug: '' };
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute) {

    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.categoryService.getCategoryBySlug(slug).subscribe(category => {
      console.log(category);
      this.category = category;

      this.categoryForm = fb.group({
        name: [this.category.name, this.requiredMessage('Назва є обов\'язковою')],
        slug: [this.category.slug, this.requiredMessage('Slug є обов\'язковим')],
        imageFile: null
      });
    });
  }


  requiredMessage(message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value ? { message: message } : null;
    };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Можна завантажувати лише зображення';
        return;
      }

      this.categoryForm.patchValue({
        imageFile: file
      });
      this.categoryForm.get('imageFile')?.updateValueAndValidity();
      this.imagePreview = URL.createObjectURL(file);
    }
    else {
      this.categoryForm.patchValue({
        imageFile: null
      });
      this.imagePreview = null;
    }
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.errorMessage = null;

    const formData = serialize(this.categoryForm.value);

    this.categoryService.createCategory(formData).subscribe({
      next: (res) => {
        this.imagePreview = null;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = ErrorUtils.handleValidation(err, this.categoryForm);
      }
    });
  }
}
