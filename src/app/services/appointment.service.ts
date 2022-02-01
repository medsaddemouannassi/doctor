import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointmentURL: string = "http://localhost:3000/api/admin-appointments";
  constructor(private httpClient: HttpClient) { }

  sendReqToMakeAppointment(obj) {
    return this.httpClient.post<{ result: any }>(this.appointmentURL, obj)
  }
  sendReqToGetAllAppointments() {
    return this.httpClient.get<{ result: any }>(this.appointmentURL)
  }
  sendReqToDisplayAppointmentById(id) {
    return this.httpClient.get<{ result: any }>(`${this.appointmentURL}/${id}`)
  }
  sendReqToEditAppointment(newObj) {
    return this.httpClient.put<{ result: any }>(`${this.appointmentURL}/${newObj._id}`, newObj)
  }
  sendReqToDeleteAppointmentById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.appointmentURL}/${id}`)
  }
}
