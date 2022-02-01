import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements OnInit {
  patients: any = [];
  appointments: any;
  constructor(
    private patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.patientService.sendReqToGetAllPatients().subscribe((data) => {
    //   this.patients = data.result;
    // })
    this.patientService.sendReqToGetPatientsWithAppointments().subscribe((data) => {
      this.patients = data.result
      console.log(data.result);

    })
  }

  getAppointments(id) {
    if (this.patients.length == 1) {
      this.patientService.sendReqToGetPatientsWithAppointments().subscribe((data) => {
        this.patients = data.result
      })
    } else if (this.patients.length != 0) {
      this.patients = this.patients.filter(obj => obj._id == id)
      this.appointments = this.patients[0].appointments
    }
  }

  goToDisplayOrEditOrDeletePatient(id, button) {
    if (button == 'display') {
      this.router.navigate([`display-patient/${button}/${id}`])
    } else if (button == 'edit') {
      this.router.navigate([`edit-patient/${button}/${id}`])
    } else {
      this.patientService.sendReqToDeletePatientById(id).subscribe((data) => {
        this.patientService.sendReqToGetAllPatients().subscribe((data) => {
          this.patients = data.result
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
      })
    }
  }
}
