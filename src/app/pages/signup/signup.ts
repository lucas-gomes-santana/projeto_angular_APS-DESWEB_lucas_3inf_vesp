import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-signup',
  styleUrl: './signup.css',
  templateUrl: './signup.html',
})
export class Signup {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.nonNullable.group(
    {
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      course: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue],
    },

    {
      validators: (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const repeatPassword = control.get('repeatPassword')?.value;

        if (!password || !repeatPassword) {
          return null;
        }

        return password === repeatPassword ? null : { passwordsMismatch: true };
      },
    },
  );

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.router.navigate(['/home']);
  }
}
