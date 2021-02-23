import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  data = {};
  message = '';
  constructor(private fb:FormBuilder, private authService:AuthserviceService, private router:Router) {
    if (this.authService.loggedIn) {  
      this.router.navigate(['/dashboard']);
    } 
    this.loginForm = this.fb.group({
email:['', [Validators.required, Validators.email]],
password:['', [Validators.required]]
    })

   }

  ngOnInit(): void {
  }

  login(){
  this.authService.authUser(this.loginForm.value).subscribe(data => {
    this.data = data;
    this.message = data.message;
    console.log(this.message);
    if(data.success == 1){
      this.authService.login(data.access_token);
     
    }
});
  
  }

  logout(){
    this.authService.logout();
    
  }

}
