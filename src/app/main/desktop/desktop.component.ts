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
  public displayTerminal: boolean;
  public displaySnake: boolean;
  public displayContact: boolean;

  constructor(private launcherService: LauncherService) {
  }

  ngOnInit() {
    this.launcherService.getIsSnake.subscribe(isSnake => this.displaySnake = isSnake);
    this.launcherService.getIsResume.subscribe(isDisplayed => this.displayresume = isDisplayed);
    this.launcherService.getIsTerminal.subscribe(isTerminal => this.displayTerminal = isTerminal);
    this.launcherService.getIsContact.subscribe(isContact => this.displayContact = isContact);
  }

}
