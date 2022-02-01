import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patientURL: string = "http://localhost:3000/api/admin-patients";
  constructor(private httpClient: HttpClient) { }

  sendReqToGetAllPatients() {
    return this.httpClient.get<{ result: any }>(this.patientURL)
  }
  sendReqToDisplayPatientById(id) {
    return this.httpClient.get<{ result: any }>(`${this.patientURL}/${id}`)
  }
  sendReqToEditPatient(newObj) {
    return this.httpClient.put<{ result: any }>(`${this.patientURL}/${newObj._id}`, newObj)
  }
  sendReqToDeletePatientById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.patientURL}/${id}`)
  }
  sendReqToGetPatientsWithAppointments() {
    return this.httpClient.get<{ result: any }>(`${this.patientURL}/patients&appointments`)
  }
}