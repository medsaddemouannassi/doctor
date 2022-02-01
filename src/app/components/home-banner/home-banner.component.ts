import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {
  doctor: any = {};
  constructor(
    private doctorService: DoctorService,
    private router: Router
    ) { }

  ngOnInit() {
    
  }

  searchDoctor(searchInput: any) {    
    this.router.navigateByUrl(`search-professional/${searchInput}`)
    
  }

}
