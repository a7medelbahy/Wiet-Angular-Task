import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css'],
})
export class DashboardListComponent implements OnInit {
  AllCount: number = 0;
  ActiveCount: number = 0;
  MaleCount: number = 0;
  FemaleCount: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService
      .getAllCount()
      .subscribe((res) => (this.AllCount = Number(res)));
    this.employeeService
      .getActiveCount()
      .subscribe((res) => (this.ActiveCount = Number(res)));
    this.employeeService
      .getMaleCount()
      .subscribe((res) => (this.MaleCount = Number(res)));
    this.employeeService
      .getFemaleCount()
      .subscribe((res) => (this.FemaleCount = Number(res)));
  }
}
