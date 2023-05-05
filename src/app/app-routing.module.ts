import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoshboardComponent } from './doshboard/doshboard.component';
import { LoganComponent } from './logan/logan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { TransoctionsComponent } from './transoctions/transoctions.component';
const routes: Routes = [{path:'',component:LoganComponent},{path:'register',component:RegisterComponent}
,{path:'doshboard',component:DoshboardComponent},{path:'transactions',component:TransoctionsComponent},{
  path:'**',component:PageNotFoundComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
