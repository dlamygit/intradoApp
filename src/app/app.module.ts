import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProvisionComponent } from './components/provision/provision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BuildsComponent } from './components/builds/builds.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BuildConfigComponent } from './components/build-config/build-config.component';
import { LogsComponent } from './components/logs/logs.component';

import { LOCAL_STORAGE,StorageServiceModule } from 'ngx-webstorage-service';
import { BuildsService } from './service/builds.service';
import { VmModelMediumTabsComponent } from './components/build-config/vm-model-medium-tabs/vm-model-medium-tabs.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProvisionComponent,
    BuildsComponent,
    BuildConfigComponent,
    LogsComponent,
    VmModelMediumTabsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    StorageServiceModule,
    ReactiveFormsModule
  ],
  providers: [BuildsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
