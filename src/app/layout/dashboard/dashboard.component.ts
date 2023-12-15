import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ExcelServicesService } from '../../services/excel-services.service';
import { globalservices } from '../../shared/globalservices';
import { Month } from '../../../app/app_class/month';
import { formatDate } from '@angular/common';
import {Common} from '../../../app/app_class/Common';
import { login } from 'src/app/class/login';
import { hdataexcel } from '../../../app/app_class/hdataexcel';
import { Placement } from 'src/app/app_class/Placement';
import { IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';
import { SFU } from 'src/app/app_class/SFU';
import { EnrouteReport } from 'src/app/app_class/EnrouteReport';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  QueryForm = new FormGroup({
    txtfrom: new FormControl('', Validators.required),
    txtto: new FormControl('', Validators.required),
    txtmobileNo: new FormControl('', Validators.required),
    txtperson: new FormControl('', Validators.required)
  });
  today = new Date();
  nrSelect = new Date().getMonth() + 1;
  nryear = new Date().getFullYear();
  selectedMonth: Month = new Month(0, 'Select');
  months = [
    new Month(1, 'JAN'),
    new Month(2, 'FEB'),
    new Month(3, 'MAR'),
    new Month(4, 'APR'),
    new Month(5, 'MAY'),
    new Month(6, 'JUN'),
    new Month(7, 'JUL'),
    new Month(8, 'AUG'),
    new Month(9, 'SEP'),
    new Month(10, 'OCT'),
    new Month(11, 'NOV'),
    new Month(12, 'DEC')
  ];
  yeardata: any;
  counter: any;
  pcounter: any;
  lat = 20.5937;
  lng = 78.9629;
  ecount: any;
  sucount: any;
  public custcd = localStorage.getItem('custcd');
  public custnm = localStorage.getItem('custnm');
  indentdetails: any;
  ELR: any;
  placementdtl: any;
  dataSaved = false;
  massage = null;
  enroutedtl: any;
  statusmsg = [];
  ipAddress: string;
  customerMIS: any;
  sudetails: any;
  hcounter: any;
  latitude: any;
  Longitute: any;
  test1: any;
  test: any;
  exceList: Array<hdataexcel> = [];
  pList: Array<Placement> = [];
  SList: Array<SFU> = [];
  EList: Array<EnrouteReport> = [];
  stest: any;
  stest1: any;
  Vehicle: any;
  Originaddress: any;
  destinationAddress: any;
  Location_POI: any;
  ETA: any;
  currentDate = '';
  hdata: any;
  counts: any = 50;
  openedWindow: 0;
  closeResult: string;
  urlyear = this.globalService.checkString(localStorage.getItem('userstr')) + '/year';
  modalOptions: NgbModalOptions;
  public alerts: Array<any> = [];
  public sliders: Array<any> = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  excel = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  };
  constructor(private http: HttpClient, private modalService: NgbModal, private excelService: ExcelServicesService, private excelExportService: IgxExcelExporterService, private globalService
    : globalservices) {
    // this.today.setDate( this.today.getDate() + 1 );
    this.currentDate = formatDate(this.today, 'dd MMM yyyy', 'en-US', '+0530');
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
    this.sliders.push(
      {
        imagePath: 'assets/images/1.png',
        label: '',
        text:
          ''
      },
      {
        imagePath: 'assets/images/7.png',
        label: '',
        text: ''
      },
      {
        imagePath: 'assets/images/2.png',
        label: '',
        text: ''
        // 'Excellance is embedded in our organizational DAN. it is both our strength helping us constantly improve our oprational effectiveness,'
      },
      {
        imagePath: 'assets/images/3.png',
        label: '',
        text: ''
        // 'Excellance is embedded in our organizational DAN. it is both our strength helping us constantly improve our oprational effectiveness,'
      },
      {
        imagePath: 'assets/images/4.png',
        label: '',
        text: ''
        // 'Excellance is embedded in our organizational DAN. it is both our strength helping us constantly improve our oprational effectiveness,'
      },
      {
        imagePath: 'assets/images/5.png',
        label: '',
        text: ''
        // 'Excellance is embedded in our organizational DAN. it is both our strength helping us constantly improve our oprational effectiveness,'
      },
      {
        imagePath: 'assets/images/6.png',
        label: '',
        text: ''
        // 'Excellance is embedded in our organizational DAN. it is both our strength helping us constantly improve our oprational effectiveness,'
      },
    );
  }
  ngOnInit() {
    this.getIP();
    this.auditlog();
    this.http.get(this.urlyear)
      .subscribe((res) => this.yeardata = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getph?customer=' + this.custcd + '&month=' + this.nrSelect + '&year=' + this.nryear + '&fromcity=&tocity=&vehstatus=0&type=C')
      .subscribe((res) => this.hcounter = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getph?customer=' + this.custcd + '&month=' + this.nrSelect + '&year=' + this.nryear + '&fromcity=&tocity=&vehstatus=0&type=D')
      .subscribe((res) => this.hdata = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/gethomedashbord?datatype=IC&customer=' + this.custcd)
      .subscribe((res) => this.counter = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/gethomedashbord?datatype=PC&customer=' + this.custcd)
      .subscribe((res) => this.pcounter = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/gethomedashbord?datatype=EC&customer=' + this.custcd)
      .subscribe((res) => this.ecount = res);

    // this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + 'gethomedashbord?datatype=ID&customer=C00019939')
    // .subscribe((res) => this.indentdetails = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getallindent?customer=' + this.custcd)
      .subscribe((res) => this.indentdetails = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/gethomedashbord?datatype=PD&customer=' + this.custcd)
      .subscribe((res) => this.placementdtl = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/customer_Tracking_Detail?Custcd=' + this.custcd)
      .subscribe((res) => this.enroutedtl = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/gethomedashbord?datatype=SU&customer=' + this.custcd)
      .subscribe((res) => this.sucount = res);

    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/gethomedashbord?datatype=SD&customer=' + this.custcd)
      .subscribe((res) => this.sudetails = res);

      this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/gethomedashbord?datatype=LR&customer=' + this.custcd)
      .subscribe((res) => this.ELR = res);

    // window.addEventListener('beforeunload', function (e) {
    //     const currentUser = localStorage.getItem('custcd');
    //     if (currentUser) {
    //       localStorage.removeItem('isLoggedin');
    //       localStorage.removeItem('custcd');
    //       localStorage.removeItem('custnm');
    //     }
    // });
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  openWindow(Vehicle) {
    this.openedWindow = Vehicle; // alternative: push to array of numbers
  }
  isInfoWindowOpen(Vehicle) {
    return this.openedWindow === Vehicle; // alternative: check if id is in array
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  popen(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  ELRopen(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  Eopen(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  Mopen(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  EntryPage(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  Mapopen(content, Longitute, latitude, Location_POI, ETA, latestatus, vehicleno) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.Longitute = Longitute;
    this.latitude = latitude;
    this.Location_POI = Location_POI;
    this.ETA = ETA;
    this.Vehicle = vehicleno;
    this.isInfoWindowOpen(vehicleno);
    this.openWindow(vehicleno);
  }
  EMapopen(content, Longitute, latitude, Originaddress, destinationAddress, Distance, currentLocation, vehicleno) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.Longitute = Longitute;
    this.latitude = latitude;
    this.Originaddress = Originaddress;
    this.destinationAddress = destinationAddress;
    this.Location_POI = currentLocation;
    this.ETA = Distance;
    this.Vehicle = vehicleno;
    this.isInfoWindowOpen(vehicleno);
    this.openWindow(vehicleno);
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
  searchdata(ddlmonth, ddlyear, txtsfrom, txttfrom, ddlstats) {
    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + 'getph?customer=' + this.custcd + '&month=' + ddlmonth + '&year=' + ddlyear + '&fromcity=' + txtsfrom + '&tocity=' + txttfrom + '&vehstatus=' + ddlstats + '&type=D')
      .subscribe((res) => this.hdata = res);
  }
  exportIndentXLSX(): void {

    // tslint:disable-next-line:forin
    for (const key in this.hdata) {
      const hexceldata = new hdataexcel(this.hdata[key].DockNO, this.hdata[key].placementdt,
        this.hdata[key].vehicleno, this.hdata[key].from_loc, this.hdata[key].to_loc,
        this.hdata[key].VehicleStatus, this.hdata[key].TTIME, this.hdata[key].etareport);
    this.exceList.push(hexceldata);
    }
    this.excelExportService.exportData(this.exceList, new IgxExcelExporterOptions('Placement_indent_history'));
  }
  exportPlacementXLSX(): void {
    // tslint:disable-next-line:forin
    for (const key in this.placementdtl) {
      const pdata = new Placement(this.placementdtl[key].row_num, this.placementdtl[key].placementdt, this.placementdtl[key].ftltype,
        this.placementdtl[key].from_loc, this.placementdtl[key].to_loc, this.placementdtl[key].vehicleno, this.placementdtl[key].Status,
        this.placementdtl[key].epd);
    this.pList.push(pdata);
    }
    this.excelExportService.exportData(this.pList, new IgxExcelExporterOptions('ExportFileFromData'));
    // this.excelService.exportAsExcelFile(this.pList, 'Placement');
  }
  exportEnrouteXLSX(): void {
    // tslint:disable-next-line:forin
    for (const key in this.enroutedtl) {
      const edata = new EnrouteReport(this.enroutedtl[key].Indentdt, this.enroutedtl[key].old_placementdt, this.enroutedtl[key].VEHICLENO,
        this.enroutedtl[key].LRNO, this.enroutedtl[key].LRDT, this.enroutedtl[key].Origin, this.enroutedtl[key].Destination,
        this.enroutedtl[key].Consignor, this.enroutedtl[key].Consignee, this.enroutedtl[key].CurrentStatus, this.enroutedtl[key].Actual_tat_days,
        this.enroutedtl[key].Actual_EDD, this.enroutedtl[key].ETA);
    this.EList.push(edata);
    }
    this.excelExportService.exportData(this.EList, new IgxExcelExporterOptions('Enroute'));
  }
  exportMisXLSX(): void {
    // tslint:disable-next-line:forin
    for (const key in this.sudetails) {
      const sdata = new SFU(this.sudetails[key].dockno, this.sudetails[key].LRDate, this.sudetails[key].vehicleno,
        this.sudetails[key].capacity, this.sudetails[key].customer, this.sudetails[key].from_loc, this.sudetails[key].to_loc,
        this.sudetails[key].days_to_held, this.sudetails[key].tothrs, this.sudetails[key].richeddate);
    this.SList.push(sdata);
    }
    this.excelExportService.exportData(this.SList, new IgxExcelExporterOptions('SFU'));
  }
  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  onSelectMonth(monthid) {
    this.hdata = [];
    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getph?customer=' + this.custcd + '&month=' + monthid + '&year=' + this.nryear + '&fromcity=&tocity=&vehstatus=0&type=D')
      .subscribe((res) => this.hdata = res);
  }
  onSelectYear(yearid) {
    this.hdata = [];
    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getph?customer=' + this.custcd + '&month=' + this.nrSelect + '&year=' + yearid + '&fromcity=&tocity=&vehstatus=0&type=D')
      .subscribe((res) => this.hdata = res);
  }
  onsearchfrom(fromcityid) {
    this.hdata = [];
    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getph?customer=' + this.custcd + '&month=' + this.nrSelect + '&year=' + this.nryear + '&fromcity=' + fromcityid + '&tocity=&vehstatus=0&type=D')
      .subscribe((res) => this.hdata = res);
  }
  onSelecttype(typeid) {
    this.hdata = [];
    this.http.get(this.globalService.checkString(localStorage.getItem('userstr')) + '/getph?customer=' + this.custcd + '&month=' + this.nrSelect + '&year=' + this.nryear + '&fromcity=&tocity=&vehstatus=' + typeid + '&type=D')
      .subscribe((res) => this.hdata = res);
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getIPAddress() {
    return this.http.get('https://api.ipify.org/?format=json');
}
getIP() {
this.getIPAddress().subscribe((res: any) => {
  this.ipAddress = res.ip;
});
}
date = new Date()
auditlog() {
  const myObj = {
    custcode: this.custcd,
    IPAddress: this.ipAddress,
    modulename: 'Home',
    sessiontime: '0001-01-01T00:00:00',
    logindatetime: '0001-01-01T00:00:00',
    moduleopendatetime: new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString()
  };
  const myObjStr = JSON.stringify(myObj);
  const body = myObjStr.toString();
  this.http.post<any>('https://v-api.varuna.net/api/audit', body, this.httpOptions).subscribe((results: Common[]) => {
        results.forEach(xx => {
          if (this.custcd !== '') {
           this.dataSaved = true;
            this.massage = '';
          }
        });
    });
}
  onSubmit(txtfrom, txtto, txtmobileNo, txtperson) {
    const myObj = {
      customer: this.custnm,
      fromcity: txtfrom,
      tocity: txtto,
      mobileno: txtmobileNo,
      personname: txtperson
    };
    const myObjStr = JSON.stringify(myObj);
    const body = myObjStr.toString();
    this.http.post<any>('https://dev.varuna.net/vilmobile/api/Email', body, this.httpOptions).subscribe((result: Common[]) => {
          result.forEach(x => {
              this.statusmsg.push(x.StatusMsg);
              this.dataSaved = true;
              this.massage = 'Email Send Successfully';
          });
      });
  }
}
