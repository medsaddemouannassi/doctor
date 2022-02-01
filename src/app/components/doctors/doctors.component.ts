import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: any = [];
  constructor(
    private doctorService: DoctorService,
    private router: Router) { }

  ngOnInit() {
    this.doctorService.sendReqToGetAllDoctors().subscribe((data) => {
      this.doctors = data.result
    })
  }

  viewDoctorDetails(id) {
    this.router.navigateByUrl(`doctors/${id}`);    
  }
}
