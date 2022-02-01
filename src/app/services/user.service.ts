import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "http://localhost:3000/api/users";
  constructor(
    private httpClient: HttpClient,
  ) { }

  login(obj) {
    return this.httpClient.post<{ result: any }>(`${this.userURL}/login`, obj)
  }

  signup(obj, image: File) {
    let formData = new FormData();
    formData.append("firstName", obj.firstName)
    formData.append("lastName", obj.lastName)
    formData.append("email", obj.email)
    formData.append("phone", obj.phone)
    formData.append("password", obj.password)
    formData.append("confirmPassword", obj.confirmPassword)
    formData.append("department", obj.department)
    formData.append("disponibility", JSON.stringify(obj.disponibility))
    formData.append("role", obj.role)
    formData.append("image", image)  
    return this.httpClient.post<{ result: any }>(`${this.userURL}/signup`, formData)
  }

  getConnectedUser() {
    return this.httpClient.get<{ result: any }>(`${this.userURL}/connected`)
  }

  logout(email) {
    return this.httpClient.delete<{ result: any }>(`${this.userURL}/${email}`)
  }
}
