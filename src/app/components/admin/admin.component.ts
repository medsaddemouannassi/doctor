import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  connectedUser: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getConnectedUser().subscribe((data) => {
      this.connectedUser = data.result
    })
  }

}
