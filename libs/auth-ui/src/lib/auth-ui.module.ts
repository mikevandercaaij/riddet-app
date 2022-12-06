import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from '@riddet-app/util-ui';
import LoginComponent from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', pathMatch : 'full' , component: LoginComponent},
  { path: 'register', pathMatch: 'full',  component: RegisterComponent },
];


@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    NgbModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AlertModule
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AuthUiModule],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthUiModule {}
