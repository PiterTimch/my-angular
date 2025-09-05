import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {CategoryService} from '../../../services/category.service';
import {AccountService} from '../../../services/account.service';
import {serialize} from 'object-to-formdata';
import {ErrorUtils} from '../../../utils/ErrorUtils';
import {Router} from '@angular/router';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {IRegister} from '../../../models/Account';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  imagePreview: string | ArrayBuffer | null = null;
  registerForm: FormGroup;
  errorMessage: string | null = null;

  requiredMessage(message: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return !control.value ? { message } : null;
    };
  }

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', this.requiredMessage('Ім\'я є обов\'язковим')],
      lastName: ['', this.requiredMessage('Прізвище є обов\'язковим')],
      email: ['', this.requiredMessage('Пошта є обов\'язковою')],
      password: ['', this.requiredMessage('Пароль є обов\'язковим')],
      imageFile: null
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Можна завантажувати лише зображення';
        return;
      }
      this.registerForm.patchValue({ imageFile: file });
      this.imagePreview = URL.createObjectURL(file);
    } else {
      this.registerForm.patchValue({ imageFile: null });
      this.imagePreview = null;
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const model = this.registerForm.value as IRegister;

    this.accountService.registerUser(model).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errorMessage = ErrorUtils.handleValidation(err, this.registerForm);
      }
    });
  }
}
