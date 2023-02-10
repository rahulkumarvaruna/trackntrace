import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { globalservices } from '../shared/globalservices';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { login } from '../class/login';
import { isEmpty } from 'rxjs/operators';
import { Common } from '../app_class/Common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  LoginForm = new FormGroup({
      email: new FormControl('' , Validators.required),
      password: new FormControl('', Validators.required)
  });
  public showPassword: boolean;
  public showPasswordOnPress: boolean;
  
  ipAddress: string;
  isLoginError = false;
  loading = false;
  custcd: string;
  custnm: string;
  str: string;
  userstr: string;
  submitted = false;
  returnUrl: string;
  dataSaved = false;
  massage = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  };
    constructor(
      public router: Router, private http: HttpClient, private globalService
      : globalservices
    ) {}
    ngOnInit() {
      // this.getIP();
  }
  getIPAddress() {
        return this.http.get('http://api.ipify.org/?format=json');
  }
  getIP() {
    this.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }
  getaduit() {
    const myObj = {
      custcode: this.custcd,
      IPAddress: this.ipAddress,
      modulename: 'loginPage',
      sessiontime: '',
      logindatetime: new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),
      moduleopendatetime: ''
    };
    const myObjStr = JSON.stringify(myObj);
    const body = myObjStr.toString();
    this.http.post<any>('http://dev.varuna.net/vilmobile/api/audit', body, this.httpOptions).subscribe((results: Common[]) => {
          results.forEach(xx => {
            console.log('scope is ' + xx.StatusMsg);
            if (this.custcd !== '') {
             this.dataSaved = true;
            this.massage = '';
            }
          });
      });
  }
  onSubmit(userName, password) {
    debugger;
   this.userstr = userName.charAt(0);
   localStorage.setItem('userstr', this.userstr);
   console.log(localStorage.getItem('userstr'));
   if (this.userstr === 'S' || this.userstr === 's') {
     // userName = userName.replace(userName.charAt(0),'c');
    userName = userName;
    password = password;
    console.log(userName);
   }
   console.log(userName);
   this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getCustLoginAuthority?LoginId=' + userName + '&Password=' + password).subscribe((result: login[]) => {

    // this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getCustLoginAuthority?LoginId=' + userName + '&Password=' + password).subscribe((result: login[]) => {

    result.forEach(x => {
        this.custcd = x.custcd;
        this.custnm = x.custnm;
        localStorage.setItem('custcd', this.custcd);
        localStorage.setItem('custnm', this.custnm);
        localStorage.setItem('isLoggedin', 'true');
        this.getaduit();
        this.router.navigate(['/dashboard']);
      });
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }
}
