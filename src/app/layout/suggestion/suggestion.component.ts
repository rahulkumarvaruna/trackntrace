import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Qus } from 'src/app/app_class/Qus';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  public question: any;
  entries = [];
  isShow = true;
  Anslist: Qus[];
  selectedEntry;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  feedback: FormGroup;
  selectedLink = 'feedback';
  submitted = false;
  public custcd = localStorage.getItem('custcd');
  public custnm = localStorage.getItem('custnm');
  constructor(private translate: TranslateService, private modalService: NgbModal, public router: Router, private http: HttpClient, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.http.get('http://dev.varuna.net/vilmobile/api/data/getquestion')
      .subscribe((res) => this.question = res);
    this.feedback = this._formBuilder.group({
      feedbackdetails: ['', Validators.required],
      Name: ['', Validators.required],
      DESIGNATION: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  get f() { return this.feedback.controls; }

  setradio(e: string): void {

        this.selectedLink = e;
  }
  isSelected(name: string): boolean {
        if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown
            return false;
  }
      return (this.selectedLink === name); // if current radio button is selected, return true, else return false
 }
  onSelectionChange(entry, value) {
    for (const order of this.entries) {
      if (entry === order.Recordid) {
        this.entries.splice(this.entries.indexOf(order), 1);
        break;
      }
    }
    const Q = new Qus();
    Q.Recordid = entry;
    Q.Ans = value;
    this.entries.push(Q);
    // alert(JSON.stringify(this.entries));
  }
  onremarks(entry, value) {
    this.entries.find(item => item.Recordid === entry).remarks = value;
    // alert(JSON.stringify(this.entries));
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    // tslint:disable-next-line:prefer-const
    let mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
  onSubmit() {
    this.submitted = true;
    if (this.entries.length === 0) {
      alert('Please Select few questions!! :-)\n\n');
      return;
    }
    // stop here if form is invalid
    if (this.feedback.invalid) {
        return;
    }
    const myFormValue = this.feedback.value;
    const formData = new FormData();
    formData.append('files', this.fileData);
    formData.append('custcd', this.custcd);
    formData.append('Question', JSON.stringify(this.entries));
    formData.append('formobject', JSON.stringify(myFormValue));
    console.log(this.fileData);
    this.fileUploadProgress = '0%';
    this.http.post('http://dev.varuna.net/vilmobile/api/Upload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          console.log(events.body);
          alert('SUCCESS !!');
        }
      });
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.feedback.value));
  }

}
