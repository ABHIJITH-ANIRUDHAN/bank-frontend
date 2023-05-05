import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http:HttpClient) { }
  register(acno:any,uname:any,pswd:any){
    const body={
      acno,
      uname,
      pswd
    }
   return this.http.post('http://localhost:3000/register',body)
  }
  login(acno:any,pswd:any){
    const body={
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login',body)
  }
  //add token to request header
  appendToken(){
    //to get token from local storage
    const token=localStorage.getItem('token')
    let headers=new HttpHeaders()
    if(token){
      let headers=new HttpHeaders()
      headers=headers.append('verify-token',token)
      options.headers=headers
    }
    return options
  }
  getBalance(acno:any){
//server call to get balance for requested acno
  return this.http.get('http://localhost:3000/getBalance/'+acno,this.appendToken())
  }
  fundTransfer(toAcno:any,pswd:any,amount:any){
    const body={
      toAcno,
      pswd,
      amount
    }
  //api call
  return this.http.post('http://localhost:3000/fund-transfer',body,this.appendToken())
  }
  //transaction history api
  miniStatement(){
    //api call for transactions
    return this.http.get('http://localhost:3000/transacion-history',this.appendToken())
  }
  deleteAcno(){
    return this.http.delete('http://localhost:3000/delete-account',this.appendToken())
  }
}
