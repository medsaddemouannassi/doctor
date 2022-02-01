import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctorURL: string = "http://localhost:3000/api/admin-doctors"
  constructor(private httpClient: HttpClient) { }

  sendReqToGetAllDoctors() {
    return this.httpClient.get<{ result: any }>(this.doctorURL)
  }
  sendReqToDisplayDoctorById(id) {
    return this.httpClient.get<{ result: any }>(`${this.doctorURL}/${id}`)
  }
  sendReqToEditDoctor(newObj, image: File) {
    let formData = new FormData();
    formData.append("firstName", newObj.firstName)
    formData.append("lastName", newObj.lastName)
    formData.append("email", newObj.email)
    formData.append("phone", newObj.phone)
    formData.append("password", newObj.password)
    formData.append("confirmPassword", newObj.confirmPassword)
    formData.append("department", newObj.department)
    formData.append("disponibility", newObj.disponibility)
    formData.append("role", newObj.role)
    formData.append("image", image)
    return this.httpClient.put<{ result: any }>(`${this.doctorURL}/${newObj._id}`, formData)
  }
  sendReqToDeleteDoctorById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.doctorURL}/doctors/find/${id}`)
  }
  searchDoctorByInput(input) {
    return this.httpClient.get<{ result: any }>(`${this.doctorURL}/search-professional/${input}`)
  }
  sendReqToGetDoctorsWithAppointments() {
    return this.httpClient.get<{ result: any }>(`${this.doctorURL}/doctors&appointments`)
  }
}
