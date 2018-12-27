import { Component, OnInit } from '@angular/core';
import { LauncherService } from '../../shared/launcher.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  public displayresume: boolean;
  private isResumeDisplayed: Observable<boolean>;

  public displayTerminal: boolean;
  private isTerminalDisplayed: Observable<boolean>;

  constructor(private launcherService: LauncherService) {
  }

  ngOnInit() {
    this.isResumeDisplayed = this.launcherService.getIsResume;
    this.isTerminalDisplayed = this.launcherService.getIsTerminal;
    this.isResumeDisplayed.subscribe(isDisplayed => this.displayresume = isDisplayed);
    this.isTerminalDisplayed.subscribe(isTerminal => this.displayTerminal = isTerminal);
  }

}
