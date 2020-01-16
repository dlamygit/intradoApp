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
import { FormErrorsComponent } from './app-common/forms/components/form-errors/form-errors.component';
import { FormFieldComponent } from './app-common/forms/components/form-field/form-field.component';
import { FormFieldContainerComponent } from './app-common/forms/components/form-field-container/form-field-container.component';
import { FormGroupFieldComponent } from './app-common/forms/components/form-group-field/form-group-field.component';
import { FormErrorsDirective } from './app-common/forms/directives/form-errors.directive';
import { FormGroupDivDirective } from './app-common/forms/directives/form-group-div.directive';
import { FeedbackComponent } from './app-common/feedback/components/feedback/feedback.component';
import { BuildConfigCustomerInformationComponent } from './components/build-config/build-config-customer-information/build-config-customer-information.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProvisionComponent,
    BuildsComponent,
    BuildConfigComponent,
    LogsComponent,
    VmModelMediumTabsComponent,
    FormErrorsComponent,
    FormFieldComponent,
    FormFieldContainerComponent,
    FormGroupFieldComponent,
    FormErrorsDirective,
    FormGroupDivDirective,
    FeedbackComponent,
    BuildConfigCustomerInformationComponent
    
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
