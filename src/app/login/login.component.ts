import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
 })
 constructor(private fb:FormBuilder){

 }
}
