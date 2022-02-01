import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any = [];
  constructor() { }

  ngOnInit() {
    this.departments = [
      { department: "Opthomology", description: "Saepe nulla praesentium eaque omnis perferendis a doloremque.", image: "assets/images/service/service-1.jpg" },
      { department: "Cardiology", description: "Saepe nulla praesentium eaque omnis perferendis a doloremque.", image: "assets/images/service/service-2.jpg" },
      { department: "Dental Care", description: "Saepe nulla praesentium eaque omnis perferendis a doloremque.", image: "assets/images/service/service-3.jpg" },
      { department: "Child Care", description: "Saepe nulla praesentium eaque omnis perferendis a doloremque.", image: "assets/images/service/service-4.jpg" },
      { department: "Pulmology", description: "Saepe nulla praesentium eaque omnis perferendis a doloremque.", image: "assets/images/service/service-6.jpg" },
      { department: "Gynecology", description: "Saepe nulla praesentium eaque omnis perferendis a doloremque.", image: "assets/images/service/service-8.jpg" }
    ]
  }

}
