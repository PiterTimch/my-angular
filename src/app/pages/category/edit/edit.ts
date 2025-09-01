import { Component } from '@angular/core';
import {ICategory, ICategoryCreate, ICategoryEdit} from '../../../models/Category';
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
import {environment} from '../../../../environments/environment';

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
  category: ICategory = { name: '', slug: '', id: 0 };
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

      this.imagePreview = `${environment.imagePath}/800_${this.category.image}`

      this.categoryForm = fb.group({
        id: [this.category.id],
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

    const formData = serialize(this.categoryForm.value);

    this.categoryService.editCategory(formData).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = ErrorUtils.handleValidation(err, this.categoryForm);
      }
    });
  }
}
