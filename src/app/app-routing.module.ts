import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AddProfessionalComponent } from './components/add-professional/add-professional.component';
import { AddRdvComponent } from './components/add-rdv/add-rdv.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactComponent } from './components/contact/contact.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SearchProfessionalComponent } from './components/search-professional/search-professional.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { SignupPatientComponent } from './components/signup-patient/signup-patient.component';
import { SignupProfessionalComponent } from './components/signup-professional/signup-professional.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "department", component: DepartmentComponent },
  { path: "departments", component: DepartmentsComponent },
  { path: "doctors", component: DoctorsComponent },
  { path: "doctors/:id", component: DoctorComponent },
  { path: "add-patient", component: AddPatientComponent },
  { path: "display-patient/:button/:id", component: AddPatientComponent },
  { path: "edit-patient/:button/:id", component: AddPatientComponent },
  { path: "add-rdv", component: AddRdvComponent },
  { path: "add-rdv/:button/:id", component: AddRdvComponent },
  { path: "admin", component: AdminComponent },
  { path: "login", component: LoginComponent },
  { path: "search-professional/:input", component: SearchProfessionalComponent },
  { path: "signup-admin", component: SignupAdminComponent },
  { path: "signup-patient", component: SignupPatientComponent },
  { path: "signup-professional", component: SignupProfessionalComponent },
  { path: "add-professional", component: AddProfessionalComponent },
  { path: "edit-professional/:id", component: AddProfessionalComponent },
  { path: "contact", component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
