import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{
    provide: CdkStepperModule, 
    useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HeaderComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  public pushRightClass: string;
  public notificationdata: any;
  public notificaioncntr: number;
  trackLR: any;
  lrpickup: any;
  lrintrans: any;
  completed: true;
  lrsfu: any;
  lrunload: any;
  searchTerm: any;
  state: string;
  closeResult: string;
  modalOptions: NgbModalOptions;
  myControl = new FormControl();
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];
  public custcd = localStorage.getItem('custcd');
  public custnm = localStorage.getItem('custnm');
  constructor(private translate: TranslateService, private modalService: NgbModal, public router: Router, private http: HttpClient, private _formBuilder: FormBuilder) {

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };

    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.pushRightClass = 'push-right';
    this.http.get('http://erpapi.varuna.net/vilmobile/Customer/notication?Custcd=' + this.custcd)
      .subscribe((res) => this.notificationdata = res);


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }
  LRExist = "";
  CheckLR(txtlr: string) {
    this.http.get('https://v-api.varuna.net/api/lrtrack?custcd=' + this.custcd + '&dockNo=' + txtlr + '&flag=0')
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

        this.http.get('https://v-api.varuna.net/api/lrtrack?custcd=' + this.custcd + '&dockNo=' + value + '&flag=0')
          .subscribe((a) => this.lrpickup = a);
        this.http.get('https://v-api.varuna.net/api/lrtrack?custcd=' + this.custcd + '&dockNo=' + value + '&flag=1')
          .subscribe((b) => this.lrintrans = b);
        this.http.get('https://v-api.varuna.net/api/lrtrack?custcd=' + this.custcd + '&dockNo=' + value + '&flag=2')
          .subscribe((c) => this.lrsfu = c);
        this.http.get('https://v-api.varuna.net/api/lrtrack?custcd=' + this.custcd + '&dockNo=' + value + '&flag=3')
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

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('custcd');
    localStorage.removeItem('custnm');
    localStorage.removeItem('userstr');
  }

  changeLang(language: string) {
    this.translate.use(language);
  }
}
