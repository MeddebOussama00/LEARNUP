import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Import FormControl
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  submitting = false;
  error: string = '';
  id: string | null = null; 
  type: string | null = null; 

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private loginService: LoginService,
    private route: Router
  ) {}


  ngOnInit(): void {
    this.loginForm = new FormGroup({ 
      email: this.emailControl,
      password: new FormControl('', [Validators.required])
    });
  }

  validateInput(): void {
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      this.emailErrorMessage = 'Email is required.';
    } else if (emailControl?.hasError('email')) {
      this.emailErrorMessage = 'Please enter a valid email address.';
    }
  
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      this.passwordErrorMessage = 'Password is required.';
    }
  }

signup(){
  this.route.navigate(['/register']);}
  
  submitForm(event: Event): void {
    event.preventDefault();
    this.validateInput();
    if (this.loginForm.valid && !this.submitting) {
      this.submitting = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.loginService.login(email, password).subscribe(
        (response: any) => {
          if (response && response.message === 'Login successful.') {
            console.log(response.message);
            if (this.loginService.getId()) {
              this.id = this.loginService.getId();
            }
            if (this.loginService.getType()) {
              this.type = this.loginService.getType();
            }
            this.route.navigate(['/Search']);
          } else {
            this.error = 'Email or password is incorrect. Please try again.';
          }
          this.submitting = false;
        },
        (error) => {
          console.error('Error occurred during login:', error);
          if (error.status === 401) {
            this.error = 'Email or password is incorrect. Please try again.';
          } else {
            this.error = 'An error occurred. Please try again later.';
          }
          this.submitting = false;
        }
      );
    }
  }
}