import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { authBaseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private routeListener = new Subject<string>();
  private route = "/";


  constructor(private http: HttpClient) { }

  checkIfIdentityNumberExists(id: string) {
    return this.http.get<boolean>(authBaseUrl + "/checkId/" + id)
  }
  checkIfEmailExists(id: string) {
    return this.http.get<boolean>(authBaseUrl + "/checkEmail/" + id)
  }
  updateSocialUserInfo(updatedFieldsToSend:{identityNumber:string,city:string,street:string}) {
    return this.http.patch<{msg:string}>(authBaseUrl + "/update-social-user",updatedFieldsToSend)
  }

  setRoute(route: string) {
    this.route = route;
    this.routeListener.next(this.route);
  }
  getRouteListener() {
    return this.routeListener.asObservable();
  }

}
