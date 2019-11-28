import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvisionComponent } from './components/provision/provision.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'provision', component:ProvisionComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
