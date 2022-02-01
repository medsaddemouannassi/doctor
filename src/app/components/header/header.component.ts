import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connectedUser: any;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
        this.userService.getConnectedUser().subscribe((data) => {
          // if (data.result) {
            this.connectedUser = data.result
          // }
        })
  }

  logout (email) {    
    this.userService.logout(email).subscribe((data) => {
      location.replace("")
    })
  }
}
