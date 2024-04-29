import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private route:Router) {

  }
  ngOnInit(){
    const newLocal = this;
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
  signup(e: Event) {
    e.preventDefault()
    const usernameControl = this.signupForm.get("username");
    const emailControl = this.signupForm.get("email");
    const passwordControl = this.signupForm.get("password");
    const confirmPasswordControl = this.signupForm.get("confirmPassword");

    if (!usernameControl || !emailControl || !passwordControl || !confirmPasswordControl) {
      alert('Form controls are null. Please check your form initialization.');
      return;
    }

    if (usernameControl.value === '' ||
        emailControl.value === '' ||
        passwordControl.value === '' ||
        confirmPasswordControl.value === '') {
      alert('Please fill in all required fields.');
      return;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      alert('Password and Confirm Password do not match.');
      return;
    }
    if(this.signupForm.valid){
      this.route.navigate(['/login'])
    }
  }

}

