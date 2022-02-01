import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  signupAdminForm: FormGroup;
  emailExistMsg: string;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupAdminForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9_-]{8,8}$")]],
      password: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(27)]],
      confirmPassword: ["", [Validators.required]]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      })
  }

  signupAdmin() {
    this.signupAdminForm.value.role = "admin"
    this.userService.signup(this.signupAdminForm.value, null).subscribe((data) => {
      if (data.result == "0") {
        this.emailExistMsg = "E-mail already exist"
      } else {
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
          title: 'Signed in successfully'
        })
        this.router.navigate(["login"])
      }
    })
  }
}
