import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm =this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    cpassword:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  registerStatus: any;
  constructor(private fb:FormBuilder,private api:ApiService,private registerRouter:Router){

  }
  register(){
   let uname=this.registerForm.value.username
   let acno=this.registerForm.value.acno
   let pswd=this.registerForm.value.password
   let cpswd=this.registerForm.value.cpassword
    
    if(this.registerForm.valid){
      if(pswd==cpswd){
        this.api.register(acno,uname,pswd)
        .subscribe((result:any)=>{
          this.registerStatus=true;
          setTimeout(()=>{
            this.registerRouter.navigateByUrl('')
          },5000);
        },
        (result:any)=>{
          alert(result.error.message)
          this.registerForm.reset()
        })
      } else{ 
        alert('Invalid form')
      }
    }
    else{
      alert('Invalid Form')
    }
  }
}
   
  

