import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupPatientComponent } from './components/signup-patient/signup-patient.component';
import { SignupProfessionalComponent } from './components/signup-professional/signup-professional.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AddRdvComponent } from './components/add-rdv/add-rdv.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchProfessionalComponent } from './components/search-professional/search-professional.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { FeaturesComponent } from './components/features/features.component';
import { HomeAboutComponent } from './components/home-about/home-about.component';
import { CounterComponent } from './components/counter/counter.component';
import { HomeServicesComponent } from './components/home-services/home-services.component';
import { HomeAppointmentComponent } from './components/home-appointment/home-appointment.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AboutComponent } from './components/about/about.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentComponent } from './components/department/department.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ContactComponent } from './components/contact/contact.component';
import { BannerComponent } from './components/banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminAppointmentsComponent } from './components/admin-appointments/admin-appointments.component';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminPatientsComponent } from './components/admin-patients/admin-patients.component';
import { AddProfessionalComponent } from './components/add-professional/add-professional.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupPatientComponent,
    SignupProfessionalComponent,
    HeaderComponent,
    FooterComponent,
    AddPatientComponent,
    AddRdvComponent,
    AdminComponent,
    SearchProfessionalComponent,
    HomeBannerComponent,
    FeaturesComponent,
    HomeAboutComponent,
    CounterComponent,
    HomeServicesComponent,
    HomeAppointmentComponent,
    TestimonialComponent,
    ClientsComponent,
    AboutComponent,
    DepartmentsComponent,
    DepartmentComponent,
    DoctorsComponent,
    DoctorComponent,
    ContactComponent,
    BannerComponent,
    AdminAppointmentsComponent,
    AdminDoctorsComponent,
    AdminPatientsComponent,
    AddProfessionalComponent,
    SignupAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
