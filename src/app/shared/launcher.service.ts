import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LauncherService {

  private isResume: BehaviorSubject<boolean>;
  private isTerminal: BehaviorSubject<boolean>;

  constructor() {
    this.isResume = new BehaviorSubject(false);
    this.isTerminal = new BehaviorSubject(true);
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

}
