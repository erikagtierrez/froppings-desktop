import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UsersService {
  apiUrl='http://localhost:3030';

  constructor(private http: Http) {}

  login(email: string, password: string){
    let headers = new Headers({ 'Content-Type': 'application/json' })
		let user = {
			"email": email,
			"password": password,
		}
		return this.http.post(this.apiUrl + '/auth/local', JSON.stringify(user), { headers: headers }).map(
			(response: Response) => response.json()).catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  }

}
