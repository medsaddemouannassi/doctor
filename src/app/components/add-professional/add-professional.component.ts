import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.css']
})
export class AddProfessionalComponent implements OnInit {
  signupProfessionalForm: FormGroup;
  doctor: any = {};
  doctorId: any;
  title: string = "Add A Doctor";
  buttonText: any = "Add Doctor";
  imagePreview: any;
  departments: any = ["cardiologist", "dentist", "dermatologist", "ophthalmologist", "pediatrician", "psychotherapist", "radiologist", "gynecologist", "neurologist", "nutritionist"]
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.doctorId = this.activatedRoute.snapshot.paramMap.get('id');
    this.signupProfessionalForm = this.formBuilder.group({
      department: ["", [Validators.required]],
      disponibility: this.formBuilder.array([], [Validators.required]),
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(17)]],
      email: ["", [Validators.required, Validators.email]],
      image: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9_-]{8,8}$")]],
      password: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(27)]],
      confirmPassword: ["", [Validators.required]]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      })
    if (this.doctorId) {
      this.title = "Edit A Doctor";
      this.buttonText = "Edit Doctor"
      this.doctorService.sendReqToDisplayDoctorById(this.doctorId).subscribe((data) => {
        this.doctor = data.result
      })
    }
  }

  addOrEditDoctor() {
    if (this.doctorId) {
      this.doctor.disponibility = this.signupProfessionalForm.value.disponibility
      this.doctorService.sendReqToEditDoctor(this.doctor, this.signupProfessionalForm.value.image).subscribe((data) => {
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
          title: 'Doctor edited successfully'
        })
        this.router.navigate(['admin'])
      })
    } else {
      this.signupProfessionalForm.value.role = "doctor";
      this.userService.signup(this.signupProfessionalForm.value, this.signupProfessionalForm.value.image).subscribe((data) => {
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
          title: 'Doctor added successfully'
        })
        this.router.navigate(['admin'])
      })
    }
  }

  onCheckboxChange(e) {
    const disponibility: FormArray = this.signupProfessionalForm.get('disponibility') as FormArray;
    if (e.target.checked) {
      disponibility.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      disponibility.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          disponibility.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupProfessionalForm.patchValue({ image: file });
    this.signupProfessionalForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
