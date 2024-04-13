import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Initialize loginForm here
  emailErrorMessage: string = '';
  submitting = false; 
  passwordErrorMessage=''
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  

  validateInput(): void {
    console.log('Validating input...');
  
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  
    const emailControl = this.loginForm.get('email');
    console.log('Email control:', emailControl);
  
    if (emailControl?.errors?.['required']) {
      this.emailErrorMessage = 'Email is required.';
    } else if (emailControl?.errors?.['email']) {
      this.emailErrorMessage = 'Please enter a valid email address.';
    }
  
    const passwordControl = this.loginForm.get('password');
    console.log('Password control:', passwordControl);
  
    if (passwordControl?.errors?.['required']) {
      this.passwordErrorMessage = 'Password is required.';
    } else if (passwordControl?.errors?.['minlength']) {
      this.passwordErrorMessage = 'Password must be at least 8 characters long.';
    }
  }
  
  submitForm(event: Event): void {
    event.preventDefault();
    this.validateInput();

    if (this.loginForm.valid && !this.submitting) {
      // Form is valid, perform submission logic here
      this.submitting = true;
      console.log('Form submitted');
      // You might want to add logic here for actually submitting the form, like calling an authentication service.
    }
  }
  

}