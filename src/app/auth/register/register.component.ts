import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  data:any;
  message = '';

  constructor(private fb:FormBuilder, private authService:AuthserviceService, private router:Router, private SpinnerService: NgxSpinnerService) {
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

          this.SpinnerService.show();
    
          this.authService.registerUser(this.registerForm.value).subscribe((data) => {
            this.data = data;
        
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('uid', data.user.id);
    localStorage.setItem('name', data.user.name);
            this.router.navigate(['/dashboard']);
            this.SpinnerService.hide();
          }, (error)=>{
            this.message = error[0];
            this.SpinnerService.hide();
          });
      
          
        }

}
