import { Component, OnInit } from '@angular/core';
import { LauncherService } from '../../shared/launcher.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(private launcherService: LauncherService) { }

  ngOnInit() {
  }

  closeResume() {
    this.launcherService.toggleResume();
  }

}
