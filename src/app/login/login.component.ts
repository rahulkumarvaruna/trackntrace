import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { globalservices } from '../shared/globalservices';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { login } from '../class/login';
import { isEmpty } from 'rxjs/operators';
import { Common } from '../app_class/Common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

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
  //changes
  trackLR: any;
  lrpickup: any;
  lrintrans: any;
  lrsfu: any;
  lrunload: any;
  state: string;
  closeResult: string;
  modalOptions: NgbModalOptions;
  LoginForm: FormGroup
  pageActivatio: any = ""
  customerCode: any
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  };
  constructor(
    public router: Router, private modalService: NgbModal, private http: HttpClient, private globalService
      : globalservices
  ) { }
  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
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
      logindatetime: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
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
        debugger
        this.isLoginError = true;
        alert('Invalid Authentication... ❌')
      });
  }
  LRExist = "";
  CheckLR(txtlr: string) {
    this.http.get('https://v-api.varuna.net/api/lrtrackwithoutlogin?dockNo=' + txtlr + '&flag=0')
      .subscribe(res => {
        this.trackLR = res;
        if (this.trackLR.data.length === 0) {
          this.LRExist = "Invlaid Docket No";
        }
        else {
          this.LRExist = "";
        }
      });
  }
  popen(content, value: string) {
    // tslint:disable-next-line:no-non-null-assertion
    console.log(value);
    if (this.LRExist === "") {
      if (value === '') {

      } else {

        this.http.get('https://v-api.varuna.net/api/lrtrackwithoutlogin?&dockNo=' + value + '&flag=0')
          .subscribe((a) => this.lrpickup = a);
        this.http.get('https://v-api.varuna.net/api/lrtrackwithoutlogin?&dockNo=' + value + '&flag=1')
          .subscribe((b) => this.lrintrans = b);
        this.http.get('https://v-api.varuna.net/api/lrtrackwithoutlogin?&dockNo=' + value + '&flag=2')
          .subscribe((c) => this.lrsfu = c);
        this.http.get('https://v-api.varuna.net/api/lrtrackwithoutlogin?&dockNo=' + value + '&flag=3')
          .subscribe((d) => this.lrunload = d);
        this.state = 'done';

        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  forgot_password_page() {
    this.pageActivatio = "forgot_page"
  }
  generte_otp(code: any) {
    debugger
    console.log(code.value)
    this.customerCode = code?.value
    return this.http.get(this.globalService.getOtpBycustomerCode(this.customerCode)).subscribe((res: any) => {
      if (res.StatusCode === "1") {
        this.pageActivatio = "email_sent_for_otp"
        setTimeout(() => {
          this.pageActivatio = "otp_page"
        }, 3000)
      } else {
        alert(res.Response + '❌')
      }
    })

  }
  otp_details(data: any) {
    // if(data.value.length=4){

    // }
    return this.http.get(this.globalService.getPasswordvarificationBycustCode_otp(this.customerCode, data.value)).subscribe((res: any) => {
      if (res.StatusCode === "1") {
        this.pageActivatio = ""
        alert(res.Response + '✅')
      } else {
        alert(res.Response + '❌')
      }
    })


  }
}
