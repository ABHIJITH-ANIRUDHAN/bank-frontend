import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransactions:any[],searchTerm:string,transactionType:string):any[] {
   const result:any=[]
   if(!allTransactions || searchTerm=='' || transactionType==''){
    return allTransactions
   }
    allTransactions.forEach(item=>{
      if(item[transactionType].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result
  }
}
