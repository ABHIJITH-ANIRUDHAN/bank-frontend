import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-doshboard',
  templateUrl: './doshboard.component.html',
  styleUrls: ['./doshboard.component.css']
})
export class DoshboardComponent implements OnInit {
  isCollapse:boolean=true;
  currentUser:string="";
  userBalance:number=0;
  currentAcno:any;
  fundTransferSuccessMsg:string=''
  fundTransferErrorMsg:string=''
  logoutStatus:boolean=false
  deleteConfirmStatus:boolean=false
  deleteAcno:any;
  deleteMsg:string=''
  fundTransferForm=this.fb.group({
  creditAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]})
  constructor(private fb:FormBuilder,private api:ApiService,private dashboardRouter:Router){
    
  }
  ngOnInit(){
    //check user login or not
    if(!localStorage.getItem('token')){
      alert('Please login')
      //redirected to login page
      this.dashboardRouter.navigateByUrl('')
    }
    //get currentUser from local storage
    this.currentUser=localStorage.getItem("currentUser")||''
    //get currentAcno from local storage
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
  }
   collapse(){
    this.isCollapse=!this.isCollapse
   }
   getBalance(){
    //api call to get Balance
    this.api.getBalance(this.currentAcno)
    .subscribe(
      (result:any)=>{
      this.userBalance=result.balance
      },
      (result:any)=>{
        alert(result.error.message)
      }
    )

   }
   transfer(){
    if(this.fundTransferForm.valid){
      let toAcno=this.fundTransferForm.value.creditAcno
      let fromAcnoPaswd=this.fundTransferForm.value.password
      let amount=this.fundTransferForm.value.amount
      //api call
      this.api.fundTransfer(toAcno,fromAcnoPaswd,amount)
      .subscribe(
        (result:any)=>{
          this.fundTransferSuccessMsg=result.message
        },
        (result:any)=>{
          this.fundTransferErrorMsg=result.error.message
        }
      )
    }else{
      alert('Invalid Form')
    }
   }
   resetForm(){
    //reset transfer form
    this.fundTransferForm.reset()
    //reset error and success msg to body
    this.fundTransferSuccessMsg=''
    this.fundTransferErrorMsg=''
   }
   logout(){
    //remove login details from local storage
    localStorage.removeItem('token')
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUser')
    //set logout status as true
    this.logoutStatus=true
    setTimeout(()=>{
    //redirect to loggin page
    this.dashboardRouter.navigateByUrl('')
   },3000)
  }
  //deleteMyAccount()
  deleteMyAccount(){
  //set deleteConfirmStatus as true
  this.deleteConfirmStatus=true;
  //get acno to be deleted
  this.deleteAcno=this.currentAcno;
  }
  cancelDeleteConfirm(){
    //to hide child dleteConfirm view
    this.deleteAcno=""
    //set deleteConfirmStatus as false
    this.deleteConfirmStatus=false
  }
  //deleteFromParent
  deleteFromParent(event:any){
   
    this.deleteAcno=""
    //make api call to delte acno
    this.api.deleteAcno()
    .subscribe((result:any)=>{
      //display delete msg
      this.deleteMsg=result.message
      //remove login details from local storage
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
      localStorage.removeItem('currentAcno')
      setTimeout(()=>{
        //redirected to login page
        this.dashboardRouter.navigateByUrl('')
      },3000)
    },
    //status 400
    (result:any)=>{
      this.deleteMsg=result.error.message
    }
    )
  }
}

