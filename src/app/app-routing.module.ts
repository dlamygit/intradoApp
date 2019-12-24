import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvisionComponent } from './components/provision/provision.component';
import { LoginComponent } from './components/login/login.component';
import { BuildsComponent } from './components/builds/builds.component';
import { BuildConfigComponent } from './components/build-config/build-config.component';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'provision', component:ProvisionComponent},  
  {path:'builds', component:BuildsComponent},
  {path:'build_config', component:BuildConfigComponent},
  {path:'logs', component:LogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
