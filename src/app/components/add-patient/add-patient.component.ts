import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  signupPatientForm: FormGroup;
  patientId: any;
  patient: any = {};
  form:string="Add Patient"
  page: string;
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('id')
    this.page = this.activatedRoute.snapshot.paramMap.get('button')
    this.signupPatientForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9_-]{8,8}$")]],
      password: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(27)]],
      confirmPassword: ["", [Validators.required]]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      })
    if (this.patientId) {
      if (this.page == "edit") {
        this.form ="Edit Patient"
      } else {
        this.form ="Patient Info"
      }
      this.patientService.sendReqToDisplayPatientById(this.patientId).subscribe((data) => {
        this.patient = data.result
      })
    }
  }

  addOrEditPatient() {
    if (this.patientId) {
      this.patientService.sendReqToEditPatient(this.patient).subscribe((data) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Patient edited successfully'
        })
        this.router.navigate(['admin'])
      })
    } else {
      this.patient.role = "patient";
      this.userService.signup(this.patient, null).subscribe((data) => {
        this.router.navigate(['admin'])
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Patient added successfully'
        })
      })
    }
  }

}
