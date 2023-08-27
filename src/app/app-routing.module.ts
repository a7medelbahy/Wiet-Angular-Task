import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: 'new',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/new-employee/new-employee.module').then(
            (m) => m.NewEmployeeModule
          ),
      },
    ],
  },
  {
    path: 'employees',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/view-employees/view-employees.module').then(
            (m) => m.ViewEmployeesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
