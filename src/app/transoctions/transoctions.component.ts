import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transoctions',
  templateUrl: './transoctions.component.html',
  styleUrls: ['./transoctions.component.css']
})
export class TransoctionsComponent implements OnInit{
  allTransactions:any=[]
  searchTerm:string=''
 constructor(private api:ApiService,private transactionRouter:Router){}
 ngOnInit(): void {
  if(!localStorage.getItem('token')){
    alert('Please login')
    //redirected to login page
    this.transactionRouter.navigateByUrl('')
  }
   //call ministatement api from services
    this.api.miniStatement().subscribe((result:any)=>
{console.log(result.transactions);
  this.allTransactions=result.transactions
    })
}
filter(event:any){
  this.searchTerm=event.target.value
}
generatePDF(){
  //create object of jspdf
  var pdf=new jspdf()
  //set up col
   let col=['Type','FromAcno','ToAcno','Amount']
   //set up row 
   let row:any=[]
   //basic styling 
   pdf.setFontSize(16)
   pdf.text('Mini Statement',11,8)
   pdf.setFontSize(12)
   pdf.setTextColor(99)
   var allItems=this.allTransactions
   for(let item of allItems){
    //for converting object to array
    var temp=[item.type,item.fromAcno,item.toAcno,item.amount]
    row.push(temp)
   }
   //convert nested arry to pdf
   (pdf as any).autoTable(col,row,{startY:10})
   //open pdf in another tab in browser
   pdf.output('dataurlnewwindow')
   //download table as pdf
   pdf.save('ministatement.pdf')
}
}