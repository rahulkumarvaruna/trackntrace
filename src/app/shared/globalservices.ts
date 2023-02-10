// tslint:disable-next-line:class-name
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
// tslint:disable-next-line:class-name
export class globalservices {
 public BASE_USER_ENDPOINT: BehaviorSubject<string> = null;
 public BASE_USER_ENDPOINT1 = '';
 usrstr: string = localStorage.getItem('userstr');
 constructor() {
}
public checkString(usrstr): any {
  console.log(localStorage.getItem('userstr'));
    if ( usrstr === 'S' || usrstr === 's') {
      this.BASE_USER_ENDPOINT1 = 'https://scmapi.varuna.net/Customer';
      // this.BASE_USER_ENDPOINT.next(null);
      this.BASE_USER_ENDPOINT = new BehaviorSubject<string>(this.BASE_USER_ENDPOINT1);
      // this.BASE_USER_ENDPOINT.next(this.BASE_USER_ENDPOINT1);
     // this.BASE_USER_ENDPOINT = 'https://scmapi.varuna.net/customer/';
     console.log(this.BASE_USER_ENDPOINT);
    } else {
      this.BASE_USER_ENDPOINT1 = 'https://erpapinew.varuna.net/vilmobile/Customer';
      // this.BASE_USER_ENDPOINT.next(null);
      this.BASE_USER_ENDPOINT = new BehaviorSubject<string>(this.BASE_USER_ENDPOINT1);
      // this.BASE_USER_ENDPOINT.next(this.BASE_USER_ENDPOINT1);
     // this.BASE_USER_ENDPOINT= 'https://erpapinew.varuna.net/vilmobile/Customer';
     console.log(this.BASE_USER_ENDPOINT);


    }
    return this.BASE_USER_ENDPOINT.value;
}
// public static BASE_USER_ENDPOINT =  this.BASE_USER_ENDPOINT1 ;

    // return this.BASE_USER_ENDPOINT;
// this.checkString(this.usrstr);
// this.checkString(this.usrstr).then((value) => {
//     if (value > 0) {
//         this.BASE_USER_ENDPOINT= 'https://erpapinew.varuna.net/vilmobile/Customer/';
//     }
//     else{
//         this.BASE_USER_ENDPOINT = 'https://scmapi.varuna.net/customer/';
//     }
// });
  // this.checkString(usrstr)

}



