import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewEmployeesRoutingModule } from './view-employees-routing.module';
import { EmployeeslistComponent } from './employeeslist/employeeslist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    EmployeeslistComponent
  ],
  imports: [
    CommonModule,
    ViewEmployeesRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class ViewEmployeesModule { }
