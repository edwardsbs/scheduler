import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { UserViewModel } from '../models/user';
// import { UserViewModel } from '../models/user';
  
  @Injectable()
  export class AddHeaderInterceptor implements HttpInterceptor {

    userFromStorage: UserViewModel | undefined = undefined;

    constructor(private readonly localStorage: LocalStorageService) { 
        // const user = this.localStorage.getItem('user')
        // this.userFromStorage = user !== null? JSON.parse(user) as UserViewModel : undefined 
      } 
      
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // console.log('in interceptor')
      const user = this.localStorage.getItem('user')
        this.userFromStorage = user !== null? JSON.parse(user) as UserViewModel : undefined 
      // Clone the request to add the new header
      const usrId = this.userFromStorage?.userId.toString()?? '8888'
      const clonedRequest = req.clone({ headers: req.headers.append('userid', usrId) });
  
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }
  }