import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctor: any = {};
  constructor(
    private doctorService: DoctorService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    const doctorId = this.router.snapshot.paramMap.get("id");
    this.doctorService.sendReqToDisplayDoctorById(doctorId).subscribe((data) => {
      this.doctor = data.result
      console.log(this.doctor);
    })
    
  }

}
