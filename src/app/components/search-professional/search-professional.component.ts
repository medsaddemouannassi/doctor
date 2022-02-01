import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-search-professional',
  templateUrl: './search-professional.component.html',
  styleUrls: ['./search-professional.component.css']
})
export class SearchProfessionalComponent implements OnInit {
  doctors: any = [];
  input: string;
  constructor(
    private doctorService: DoctorService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.input = this.router.snapshot.params["input"]
    this.doctorService.searchDoctorByInput(this.input).subscribe((data) => {
      this.doctors = data.result
    })
   
  }

}
