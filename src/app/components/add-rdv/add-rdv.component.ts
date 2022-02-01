import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styleUrls: ['./add-rdv.component.css']
})
export class AddRdvComponent implements OnInit {
  appointmentForm: FormGroup;
  appointment: any = {};
  appointmentId: any;
  appointmentText: string = "Book an appointment"
  page: any;
  buttonText: string = "Make an appointment";
  disponibility: any;
  doctors: any = [];
  days: any = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  doctorsAccordingDepartment: any = [];
  departments: any = ["cardiologist", "dentist", "dermatologist", "ophthalmologist", "pediatrician", "psychotherapist", "radiologist", "gynecologist", "neurologist", "nutritionist"]
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router,
    private doctorService: DoctorService,
  ) { }

  ngOnInit() {
    this.appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.page = this.activatedRoute.snapshot.paramMap.get('button')
    this.appointmentForm = this.formBuilder.group({
      department: [""],
      doctorId: [""],
      date: [""],
      time: [""],
      firstName: [""],
      lastName: [""],
      email: [""],
      phone: [""],
      message: [""]
    })
    if (this.appointmentId) {
      this.appointmentText = "Appointment Booked"
      this.buttonText = "Edit appointment"
      this.appointmentService.sendReqToDisplayAppointmentById(this.appointmentId).subscribe((data) => {
        this.appointment = data.result
      })
    }
    this.doctorService.sendReqToGetAllDoctors().subscribe((data) => {
      this.doctors = data.result
      this.doctorsAccordingDepartment = data.result.filter(object => object.department == this.appointment.department)
    })
  }

  onDepartmentChange(department: any) {
    this.doctorsAccordingDepartment = this.doctors.filter(object => object.department == department)
  }

  onDoctorChange(doctor: any) {
    this.disponibility = (this.doctors.find(object => object._id == doctor)).disponibility
  }

  disponibilityDay(day) {
    let result;
    if (this.disponibility) {
      if (this.disponibility.find(workDay => workDay == day)) {
        result = "green";
      } else {
        result = "#E12454";
      }
    }
    return result
  }

  makeOrEditAppointment() {
    let date = (((new Date(this.appointment.date)).toDateString()).split(" ").splice(0, 1)[0]).toLowerCase()
    if (this.appointmentId) {
      this.appointment.doctor = this.doctors.find(object => object._id == this.appointment.doctorId).firstName + " " + this.doctors.find(object => object._id == this.appointment.doctorId).lastName
      this.appointmentService.sendReqToEditAppointment(this.appointment).subscribe((data) => {
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
          title: 'Appointment edited successfully'
        })
        this.router.navigate(['admin'])
      })
    } else {
      if (this.disponibility.find(day => day.slice(0, 3) == date)) {
        this.appointment.doctor = this.doctors.find(object => object._id == this.appointment.doctorId).firstName + " " + this.doctors.find(object => object._id == this.appointment.doctorId).lastName
        this.appointmentService.sendReqToMakeAppointment(this.appointment).subscribe((data) => {
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
            title: 'Appointment added successfully'
          })
          this.router.navigate(['admin'])
        })
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2700,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'The doctor is not available that day'
        })
      }
    }
  }
}