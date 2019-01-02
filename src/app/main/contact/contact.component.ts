import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LauncherService } from '../../shared/launcher.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  todaydate;
  componentproperty;
  emailid;
  formdata;

  public from;
  public subject;
  public body;
  public errorMessage;
  public successMessage;

  constructor(private launcherService: LauncherService) {
    this.close = this.close.bind(this);
    this.from = '';
    this.subject = '';
    this.body = '';
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

  setFrom(e) {
    this.from = e.target.value;
  }
  setSubject(e) {
    this.subject = e.target.value;
  }
  setBody(e) {
    this.body = e.target.value;
    console.log(this.body);
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  }

  validateInputs() {
    this.errorMessage = '';
    if (this.body.length < 1) {
      this.errorMessage = 'Please enter a message!';
      return false;
    }
    if (this.subject.length < 1) {
      this.errorMessage = 'Please enter a subject!';
      return false;
    }
    if (this.validateEmail(this.from)) {
      this.errorMessage = 'Please enter an valid email!';
      return false;
    }
    return true;
  }

  sendMail() {
    if (this.validateInputs()) {

      this.successMessage = 'Email Sent!';
    }
  }

}
