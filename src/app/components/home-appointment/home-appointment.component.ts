import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-appointment',
  templateUrl: './home-appointment.component.html',
  styleUrls: ['./home-appointment.component.css']
})
export class HomeAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  connectedUser: any;
  disponibility: any;
  doctors: any = [];
  doctorsAccordingDepartment: any = [];
  days: any = ["monday", "tuesday", "wednesday", "thursday", "friday"]
  departments: any = ["cardiologist", "dentist", "dermatologist", "ophthalmologist", "pediatrician", "psychotherapist", "radiologist", "gynecologist", "neurologist", "nutritionist"]
  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.appointmentForm = this.formBuilder.group({
      department: ["", [Validators.required]],
      doctorId: ["", [Validators.required]],
      patientId: ["", [Validators.required]],
      date: ["", [Validators.required]],
      time: ["", [Validators.required]],
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9_-]{8,8}$")]],
      message: [""]
    })
    this.doctorService.sendReqToGetAllDoctors().subscribe((data) => {
      this.doctors = data.result
    })
    this.userService.getConnectedUser().subscribe((data) => {
      this.connectedUser = data.result 
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

  makeAppointment() {
    let date = (((new Date(this.appointmentForm.value.date)).toDateString()).split(" ").splice(0, 1)[0]).toLowerCase()
    if (this.connectedUser) {
      if (this.connectedUser.role == "patient") {
        if (this.disponibility.find(day => day.slice(0, 3) == date)) {
          this.appointmentForm.value.doctor = this.doctors.find(object => object._id == this.appointmentForm.value.doctorId).firstName + " " + this.doctors.find(object => object._id == this.appointmentForm.value.doctorId).lastName
          this.appointmentForm.value.patientId = this.connectedUser._id
          this.appointmentService.sendReqToMakeAppointment(this.appointmentForm.value).subscribe((data) => {
            this.router.navigate([''])
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
              title: 'Appointment booked successfully'
            })
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
          icon: 'warning',
          title: 'You are not a patient'
        })
      }
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
        icon: 'warning',
        title: 'You must connect to book an appointment'
      })
    }
  }
}