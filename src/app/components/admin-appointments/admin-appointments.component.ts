import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-appointments',
  templateUrl: './admin-appointments.component.html',
  styleUrls: ['./admin-appointments.component.css']
})
export class AdminAppointmentsComponent implements OnInit {
  appointments: any = [];
  action: any;
  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private userService: UserService,
    private patientService: PatientService
  ) { }

  ngOnInit() {
    this.userService.getConnectedUser().subscribe((connectedUser) => {
      this.appointmentService.sendReqToGetAllAppointments().subscribe(
        (data) => {
          if (connectedUser.result.role == "admin") {
            this.appointments = data.result;
            this.action = true;
          } else if (connectedUser.result.role == "doctor") {
            this.appointments = data.result.filter(object => object.doctorId == connectedUser.result._id)
          } else {
            this.appointments = data.result.filter(object => object.patientId == connectedUser.result._id) 
          }
        }
      );
    })
  }

  goToDisplayOrEditOrDeleteAppointment(id, button) {
    if (button == "display") {
      this.router.navigate([`add-rdv/${button}/${id}`])
    } else if (button == "edit") {
      this.router.navigate([`add-rdv/${button}/${id}`])
    } else {
      this.appointmentService.sendReqToDeleteAppointmentById(id).subscribe((data) => {
        this.appointmentService.sendReqToGetAllAppointments().subscribe((data) => {
          this.appointments = data.result
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
            title: 'Appointment deleted successfully'
          })
        })
      })
    }
  }
}
