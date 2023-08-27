import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl: string = 'http://localhost:5295/api/Employee/';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}All`);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}id/${id}`);
  }
  getAllCount() {
    return this.http.get(`${this.baseUrl}AllCount`);
  }
  getActiveCount() {
    return this.http.get(`${this.baseUrl}ActiveCount`);
  }
  getMaleCount() {
    return this.http.get(`${this.baseUrl}MaleCount`);
  }
  getFemaleCount() {
    return this.http.get(`${this.baseUrl}FemaleCount`);
  }

  AddEmployee(employee: any) {
    return this.http.post(`${this.baseUrl}Add`, employee);
  }

  UpdateEmployee(model: any, id: number) {
    return this.http.put(`${this.baseUrl}update/${id}`, model);
  }
}
