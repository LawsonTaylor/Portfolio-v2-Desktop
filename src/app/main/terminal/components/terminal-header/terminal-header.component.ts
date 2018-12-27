import { Component, OnInit } from '@angular/core';
import { LauncherService } from '../../../../shared/launcher.service';
@Component({
  selector: 'app-terminal-header',
  templateUrl: './terminal-header.component.html',
  styleUrls: ['./terminal-header.component.scss']
})
export class TerminalHeaderComponent implements OnInit {

  constructor(private launcherService: LauncherService) { }

  ngOnInit() {
  }

  exitTerminal() {
    this.launcherService.toggleTerminal();
  }

}
