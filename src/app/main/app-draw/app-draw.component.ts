
import { Component, OnInit } from '@angular/core';
import { LauncherService } from '../../shared/launcher.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-app-draw',
  templateUrl: './app-draw.component.html',
  styleUrls: ['./app-draw.component.scss']
})
export class AppDrawComponent implements OnInit {

  constructor(private launcherService: LauncherService) {
  }

  ngOnInit() {}

  launchResume() {
    this.launcherService.toggleResume();
    console.log('clicked - launch resume!');
  }

  launchTerminal() {
    this.launcherService.toggleTerminal();
  }

}
