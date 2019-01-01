import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LauncherService {

  private isResume: BehaviorSubject<boolean>;
  private isTerminal: BehaviorSubject<boolean>;
  private isSnake: BehaviorSubject<boolean>;
  private isContact: BehaviorSubject<boolean>;

  constructor() {
    this.isResume = new BehaviorSubject(false);
    this.isTerminal = new BehaviorSubject(true);
    this.isSnake = new BehaviorSubject(false);
    this.isContact = new BehaviorSubject(false);
  }

  get getIsResume(): Observable<boolean> {
    return this.isResume.asObservable();
  }

  toggleResume() {
    this.isResume.next(!this.isResume.value);
  }

  get getIsTerminal(): Observable<boolean> {
    return this.isTerminal.asObservable();
  }

  toggleTerminal() {
    this.isTerminal.next(!this.isTerminal.value);
  }

  get getIsSnake() {
    return this.isSnake.asObservable();
  }

  toggleSnake() {
    this.isSnake.next(!this.isSnake.value);
  }

  get getIsContact() {
    return this.isContact.asObservable();
  }

  toggleContact() {
    this.isContact.next(!this.isContact.value);
  }

}
