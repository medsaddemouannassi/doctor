import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {
  doctors: any = [];
  appointments: any;
  constructor(
    private doctorService: DoctorService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.doctorService.sendReqToGetAllDoctors().subscribe((data) => {
    //   this.doctors = data.result   
    // })  
    this.doctorService.sendReqToGetDoctorsWithAppointments().subscribe((data) => {
      this.doctors = data.result
      console.log(data.result);

    })
  }

  getAppointments(id) {
    if (this.doctors.length == 1) {
      this.doctorService.sendReqToGetDoctorsWithAppointments().subscribe((data) => {
        this.doctors = data.result
      })
    } else if (this.doctors.length != 0) {
      this.doctors = this.doctors.filter(obj => obj._id == id)
      this.appointments = this.doctors[0].appointments
    }
  }

  goToDisplayOrEditOrDeleteDoctor(id, button) {
    if (button == 'display') {
      this.router.navigate([`doctors/${id}`])
    } else if (button == 'edit') {
      this.router.navigate([`edit-professional/${id}`])
    } else {
      this.doctorService.sendReqToDeleteDoctorById(id).subscribe((data) => {
        this.doctorService.sendReqToGetAllDoctors().subscribe((data) => {
          this.doctors = data.result
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
            title: 'Doctor deleted successfully'
          })
        })
      })
    }
  }
}
