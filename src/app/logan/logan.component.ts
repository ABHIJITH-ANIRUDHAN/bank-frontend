import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-logan',
  templateUrl: './logan.component.html',
  styleUrls: ['./logan.component.css']
})
export class LoganComponent {
  successMsg:boolean=false;
  errorMsg:string=""
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
   })
   constructor(private fb:FormBuilder,private api:ApiService,private loginRouter:Router){
  
   }
   login(){
    if(this.loginForm.valid){
    let acno=this.loginForm.value.acno
    let password=this.loginForm.value.password
   this.api.login(acno,password)
   .subscribe(
   (result:any)=>{
    this.successMsg=true;
    //get username from result and save it in local storage
    localStorage.setItem("currentUser",result.currentUsername)
    //get acno from result and save it in locla storage
    localStorage.setItem("currentAcno",result.currentAcno)
    //get token from result and store it in local storage
    localStorage.setItem('token',result.token)
    setTimeout(()=>{
      this.loginRouter.navigateByUrl('doshboard')
    },3000);
  },
    (result:any)=>{
      this.errorMsg=result.error.message
      setTimeout(()=>{
        this.loginForm.reset(),
        this.errorMsg=""
      },5000)
    }
   )
   }
   else{
    alert('Invalid form')
   }
  }
}
