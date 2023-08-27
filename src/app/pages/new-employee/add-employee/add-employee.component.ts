import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  newEmployee!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
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
    this.newEmployee = this.fb.group({
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

  confirmSave(saveModel: any) {
    if (this.newEmployee.valid) {
      this.modalService.open(saveModel).result.then(
        (res) => {
          this.employeeService.AddEmployee(this.newEmployee.value).subscribe();
          this.newEmployee.reset();
          this.router.navigate(['/employees']);
        },
        (reason) => {
          console.log(reason);
        }
      );
      this.closeModal();
    } else {
      this.newEmployee.markAllAsTouched();
    }
  }
  confirmCancel(closeModal: any) {
    this.modalService.open(closeModal).result.then((res) => {
      this.newEmployee.reset();
      this.router.navigate(['/dashboard']);
    });
    this.closeModal();
  }
  cancel() {
    this.modalService.dismissAll();
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
