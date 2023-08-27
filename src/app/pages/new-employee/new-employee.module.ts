import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEmployeeRoutingModule } from './new-employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@NgModule({
  declarations: [AddEmployeeComponent],
  imports: [CommonModule, NewEmployeeRoutingModule, ReactiveFormsModule],
})
export class NewEmployeeModule {}
