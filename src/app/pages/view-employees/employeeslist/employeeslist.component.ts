import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employeeslist',
  templateUrl: './employeeslist.component.html',
  styleUrls: ['./employeeslist.component.css'],
})
export class EmployeeslistComponent implements OnInit {
  employees: any;
  editForm!: FormGroup;
  empId: number = 0;
  employee: any;
  p: number = 1;
  gender: number = 0;
  active: number = 0;
  itemsPerPage: number = 5;
  birthDate: Date = new Date();
  constructor(
    private employeesService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router
  ) {}
  validateDateRange(minDate: Date, maxDate: Date) {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateValue = new Date(control.value);

      if (dateValue < minDate || dateValue > maxDate) {
        return { dateOutOfRange: true };
      }

      return null;
    };
  }
  ngOnInit(): void {
    this.employeesService.getAll().subscribe((res) => (this.employees = res));
    this.editForm = this.fb.group({
      fName: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{3,10}$')],
      ],
      lName: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{3,10}$')],
      ],
      birthDate: [
        null,
        [
          Validators.required,
          this.validateDateRange(
            new Date('01/01/1963'),
            new Date('01/01/2003')
          ),
        ],
      ],
      gender: [Number, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')],
      ],
      address: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      city: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{3,25}$')],
      ],
      country: [
        null,
        [Validators.required, Validators.pattern('^[a-zA-Z_ ]{3,25}$')],
      ],
      postal: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      active: [Number, [Validators.required]],
    });
  }

  updateEmp(editModal: any, id: number) {
    console.log(id);
    this.modalService.open(editModal, { size: 'xl' });
    this.empId = Number(id);
    this.employeesService.getById(id).subscribe({
      next: (res) => {
        this.employee = res;
        this.birthDate = this.employee.birthDate;
        this.gender = this.employee.gender;
        this.active = this.employee.active;
        this.editForm.patchValue(this.employee);
      },
      error: (err) => alert(err),
    });
  }
  cancel() {
    this.modalService.dismissAll();
  }
  confirmSave(saveModel: any) {
    if (this.editForm.valid) {
      this.modalService.open(saveModel).result.then((res) => {
        this.employeesService
          .UpdateEmployee(this.editForm.value, this.empId)
          .subscribe((res) => {
            this.router.navigate(['/employees']);
          });
        this.modalService.dismissAll();
      });
      this.closeModal();
    } else {
      this.editForm.markAllAsTouched();
    }
  }
  confirmCancel(closeModal: any) {
    this.modalService.open(closeModal).result.then((res) => {
      this.modalService.dismissAll();
    });
    this.closeModal();
  }
  closeModal() {
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 5000);
  }
  submitForm(e: Event) {
    e.preventDefault();
  }
}
