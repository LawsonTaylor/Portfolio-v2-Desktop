import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-terminal-header',
  templateUrl: './terminal-header.component.html',
  styleUrls: ['./terminal-header.component.scss']
})
export class TerminalHeaderComponent implements OnInit {

  @Input()
  closeFunction: Function;

  constructor() { }

  ngOnInit() {
  }

  exitTerminal() {
    this.closeFunction();
  }

}
