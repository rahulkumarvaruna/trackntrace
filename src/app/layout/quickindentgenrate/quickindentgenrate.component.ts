import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { globalservices } from 'src/app/shared/globalservices';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BlankRow } from 'src/app/blank-row';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CSVRecord } from '../../class/CSVRecord';
import { Indent } from 'src/app/app_class/indent';
import { Data } from 'src/app/Data';
import { Common } from 'src/app/app_class/Common';
@Component({
  selector: 'app-quickindentgenrate',
  templateUrl: './quickindentgenrate.component.html',
  styleUrls: ['./quickindentgenrate.component.scss']
})
export class QuickindentgenrateComponent implements OnInit {
  constructor(private http: HttpClient, public fb: FormBuilder, private modalService: NgbModal, private globalService
    : globalservices) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }
  @ViewChild('alert', { static: true }) alert: ElementRef;

  public records: any[] = [];
  ngForm: FormGroup;
  @ViewChildren('csvReader') csvReader: any;
  IsChecked: any[];
  value: any[];
  dataSaved = false;
  ipAddress: string;
  massage = null;
  addressname: string;
  blankRowArray: Array<BlankRow> = [];
  blankRowData = new BlankRow();
  hideMultiSelectDropdownAll: boolean[] = [];
  hideMultiSelectDropdown: boolean[] = [];
  hideMultiSelectedSubjectDropdown: boolean[] = [];
  hideMultiSelectedSubjectDropdownAll: boolean[] = [];
  address: any;
  closeResult: string;
  modalOptions: NgbModalOptions;
  tempData = [];
  savedSubjects = [];
  Subject = [];
  public custcd = localStorage.getItem('custcd');
  public custnm = localStorage.getItem('custnm');
  url = this.globalService.checkString(localStorage.getItem('userstr')) + '/getindententrydtl';
  urlsave = this.globalService.checkString(localStorage.getItem('userstr')) + '/Indent_Save';
  url1 = this.globalService.checkString(localStorage.getItem('userstr')) + '/getAddressNew';
  fromcity: any;
  selectfromcity: any;
  selecttocity: any;
  tocity: any;
  vehicletype: any;
  loadability: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  };
  oppoSuitsForm = this.fb.group({
    fromcityid: ['0', [Validators.required]]
  });
  public handleError = (controlName: string, errorName: string) => {
    return this.oppoSuitsForm.controls[controlName].hasError(errorName);
  }
  ngOnInit() {
    this.getIP();
    this.auditlog();
    this.dropdownbind();
  }
  getIPAddress() {
    return this.http.get('http://api.ipify.org/?format=json');
}
closeAlert() {
  this.alert.nativeElement.classList.remove('show');
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
      modulename: 'Indent Generate',
      sessiontime: '0001-01-01T00:00:00',
      logindatetime: '0001-01-01T00:00:00',
      moduleopendatetime: new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000)).toISOString()
    };
    const myObjStr = JSON.stringify(myObj);
    const body = myObjStr.toString();
    this.http.post<any>('https://localhost:44338/api/audit', body, this.httpOptions).subscribe((results: Common[]) => {
          results.forEach(xx => {
            if (this.custcd !== '') {
             this.dataSaved = true;
              this.massage = '';
            }
          });
      });
  }
  dropdownbind() {

    this.http.get(this.url + '?CustCd=' + this.custcd + '&type=F&fcity=&tcity=&vtype=')
      .subscribe((res) => this.fromcity = res);
    this.http.get(this.url + '?CustCd=' + this.custcd + '&type=T&fcity=&tcity=&vtype=')
      .subscribe((res) => this.tocity = res);
    this.http.get(this.url + '?CustCd=' + this.custcd + '&type=S&fcity=&tcity=&vtype=')
      .subscribe((res) => this.vehicletype = res);
    this.http.get(this.url + '?CustCd=' + this.custcd + '&type=L&fcity=&tcity=&vtype=')
      .subscribe((res) => this.loadability = res);
    this.http.get(this.url1 + '?CustCd=' + this.custcd + '&city=')
      .subscribe((res) => this.address = res);
    this.addBlankRow();
  }
  deleteRow(index) {
    this.blankRowArray.splice(index, 1);
  }
  addBlankRow() {
    const blankRowData = new BlankRow();
    blankRowData.party_code = this.custcd;
    blankRowData.from = 0,
      blankRowData.to = 0,
      blankRowData.vehiclesize = 0,
      blankRowData.loadtype = 0,
      blankRowData.address = 0,
      blankRowData.Subject = [],
      this.blankRowArray.push(blankRowData);
  }
  Mopen(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  downloadCSV() {
    const data = [
      {
        PickupCity: '',
        PickupAddress: '',
        Destination: '',
        VehicleType: '',
        Loadability: ''
      }
    ];
    // tslint:disable-next-line:prefer-const
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      useBom: true,
      headers: ['PickupCity', 'PickupAddress', 'Destination', 'VehicleType', 'Loadability']
    };
    // tslint:disable-next-line:no-unused-expression
    new AngularCsv(data, 'indentdata', options);
  }
  uploadListener($event: any): void {

    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length === headerLength) {
        const csvRecord: CSVRecord = new CSVRecord();
        const pickupcitycheck = this.fromcity.filter(post => post.loc === curruntRecord[0].trim());
        if (pickupcitycheck.length === 1) {
          csvRecord.PickupCity = curruntRecord[0].trim();
        } else {
          csvRecord.Errordesc = 'wrong pickup City !!!';
        }
        csvRecord.PickupAddressId = curruntRecord[1].trim();
        const addressname = this.address.filter(post => post.typesd === Number(csvRecord.PickupAddressId));
        if (addressname.length === 1) {
          csvRecord.PickupAddress = addressname[0].addressname;
        } else {
          csvRecord.Errordesc = 'wrong Address Id !!!';
        }
        const tocitycheck = this.tocity.filter(post => post.loc === curruntRecord[2].trim());
        if (tocitycheck.length === 1) {
          csvRecord.Destination = curruntRecord[2].trim();
        } else {
          csvRecord.Errordesc = 'wrong Destination !!!';
        }
        const vehicletypename = this.vehicletype.filter(post => post.ftltype === curruntRecord[3].trim() && post.from_loccode === curruntRecord[0].trim() && post.to_loccode === curruntRecord[2].trim());
        if (vehicletypename.length === 1) {
          csvRecord.VehicleType = curruntRecord[3].trim();
          csvRecord.VehicleTypeid = vehicletypename[0].ftltypeid;
        } else {
          csvRecord.Errordesc = 'wrong Vehicle type !!!';
        }
        const loadtypename = this.loadability.filter(post => post.loadtype === curruntRecord[4].trim() && post.from_loccode === curruntRecord[0].trim() && post.to_loccode === curruntRecord[2].trim() && post.ftltype === csvRecord.VehicleTypeid);
        if (loadtypename.length === 1) {
          csvRecord.Loadability = curruntRecord[4].trim();
          csvRecord.Loadabilityid = loadtypename[0].loadid;
        } else {
          csvRecord.Errordesc = 'wrong Load type !!!';
        }
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }
  SaveData(form: NgForm, $event: Event) {
    if (form.valid) {
      const activeButton = document.activeElement.id;
      if (activeButton === 'Submit') {
        const myObjStr = JSON.stringify(this.blankRowArray);
        const body = '{"data":' + myObjStr.toString() + '}';
        this.http.post<any>('https://localhost:44338/api/indent',
          body, this.httpOptions
        )
          .subscribe(
            data => {
              this.blankRowArray = [];
              this.dropdownbind();
              this.dataSaved = true;
              // this.massage = 'Record Saved Successfully';
              console.log('POST Request is successful', data);
              for (let i = 0; i < data.length; i++) {
                this.massage = data[i].statusMsg;
                if (data[i].Status === '2' || data[i].Status === '3') {
                  this.dataSaved = false;
                  this.massage = data[i].statusMsg;
                }
              }
            },
            error => {
              this.massage = 'Error Record Not Saved !!!';
              console.log('Error', error);
            }
          );
        console.log(this.blankRowArray);
      }
    } else {
      alert('form is invalid');
    }
    // pass this data to service and api node/webapi
  }
  UploadSaveData(f: NgForm, $event: Event) {
    if (f.valid) {
      const activeButton = document.activeElement.id;
      if (activeButton === 'Submit') {
        const myObjStr = JSON.stringify(this.records);
        const body = '{"data":' + myObjStr.toString() + '}';
        this.http.post<any>('https://v-api.varuna.net/api/indent',
          body, this.httpOptions
        )
          .subscribe(
            data => {
              this.blankRowArray = [];
              this.dropdownbind();
              this.dataSaved = true;
              this.massage = 'Record Saved Successfully';
              console.log('POST Request is successful', data);
            },
            error => {
              this.massage = 'Error Record Not Saved !!!';
              console.log('Error', error);
            }
          );
        console.log(this.blankRowArray);
      }
    } else {
      alert('form is invalid');
    }
    // pass this data to service and api node/webapi
  }
}
