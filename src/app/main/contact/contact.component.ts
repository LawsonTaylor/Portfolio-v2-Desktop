import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LauncherService } from '../../shared/launcher.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  title = 'Angular 4 Project!';
  todaydate;
  componentproperty;
  emailid;
  formdata;

  constructor(private launcherService: LauncherService) {
    this.close = this.close.bind(this);
  }

  ngOnInit() {
    this.formdata = new FormGroup({
      emailid: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*')
      ])),
      passwd: new FormControl('', Validators.minLength(500))
    });
  }
  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 5) {
      return { 'passwd': true };
    }
  }
  onClickSubmit(data) {
  this.emailid = data.emailid;
  }

  close() {
    this.launcherService.toggleContact();
  }

}