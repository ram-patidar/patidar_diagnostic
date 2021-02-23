import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  data = {};
  message = '';

  constructor(private fb:FormBuilder, private authService:AuthserviceService, private router:Router) {
    if (this.authService.loggedIn) {  
      this.router.navigate(['/dashboard']);
    } 

this.registerForm = this.fb.group({
  name:['', [Validators.required]],
  email:['', [Validators.required, Validators.email]],
  password:['', [Validators.required]],
  password_confirmation:['', [Validators.required]]
 },{validator: this.checkIfMatchingPasswords('password','password_confirmation')}
 
 )

   }

  ngOnInit(): void {

  }




checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
          return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
                if(passwordConfirmationInput.value == ''){
                  return passwordConfirmationInput.setErrors({required: true})
                }

            if (passwordInput.value !== passwordConfirmationInput.value) {
              return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
          }
        }
        

        register(){

       
          console.log(this.registerForm.value);
          this.authService.registerUser(this.registerForm.value).subscribe(data => {
            this.data = data;
            localStorage.setItem('token', data.access_token);
            this.router.navigate(['/dashboard']);
          });
          
        }

}
