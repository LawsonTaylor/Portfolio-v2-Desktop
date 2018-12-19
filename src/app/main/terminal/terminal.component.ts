import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})

export class TerminalComponent implements OnInit {

  @ViewChild('cmdLine') cmdLine_: ElementRef;
  @ViewChild('outputContainer') output_: ElementRef;
  @ViewChild('terminal') terminal_: ElementRef;

  private history: Array<any>;
  private histpos: number;
  private histtemp_: string;
  private value: string;
  private user: string;

  constructor(private hostElement: ElementRef) {
    this.history = [];
    this.histpos = 0;
    this.user = 'guest@lawsonOS:~$';
  }

  ngOnInit() {
  }

  onClickTerminal() {
    this.cmdLine_.nativeElement.focus();
  }

  inputTextClick(e) {
    console.log('input text clicl');
    this.value = this.value;
  }

  historyHandler(e) {
    console.log('history handler');
    if (this.history.length) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        if (this.history[this.histpos]) {
          this.history[this.histpos] = this.value;
        } else {
          this.histtemp_ = this.value;
        }
      }

      if (e.keyCode === 38) { // up
        this.histpos--;
        if (this.histpos < 0) {
          this.histpos = 0;
        }
      } else if (e.keyCode === 40) { // down
        this.histpos++;
        if (this.histpos > this.history.length) {
          this.histpos = this.history.length;
        }
      }

      if (e.keyCode === 38 || e.keyCode === 40) {
        this.value = this.history[this.histpos] ? this.history[this.histpos] : this.histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  processNewCommand(e) {

    if (e.keyCode === 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode === 13) { // enter
      // Save shell history.
      this.value = e.target.value;
      if (this.value) {
        this.history[this.history.length] = this.value;
        this.histpos = this.history.length;
      }

      const CMDS_ = [
        'cat', 'clear', 'clock', 'date', 'echo', 'help', 'uname', 'whoami'
      ];

      // Duplicate current input and append to this.output section.
      const linedata = this.cmdLine_.nativeElement.value;
      const line = document.createElement('input');
      line.value = linedata;
      line.className = 'line';
      line.readOnly = true;
      line.value = `${this.user} ${linedata}`;
      this.output_.nativeElement.appendChild(line);
      this.cmdLine_.nativeElement.value = '';

      let cmd = '';
      let args = [];

      if (this.value && this.value.trim()) {
          args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'cat':
          const url = args.join(' ');
            this.output('<pre>' + 'preformed CAT!' + '</pre>');
          break;
        case 'clear':
          this.output_.nativeElement.innerHTML = '';
          this.value = '';
          return;
        case 'date':
          this.output( new Date() );
          break;
        case 'echo':
          this.output( args.join(' ') );
          break;
        case 'help':
          this.output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'uname':
          this.output(navigator.appVersion);
          break;
        case 'whoami':
          const result = 'lawson';
          this.output(result);
          break;
        default:
          if (cmd) {
            this.output(cmd + ': command not found');
          }
      }

      this.terminal_.nativeElement.scrollIntoView({behavior: 'instant', block: 'end', inline: 'nearest'});
      this.value = ''; // Clear/setup line for next input.
    }
  }



  output(html) {
    this.output_.nativeElement.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  inputKeydown(e) {
    this.historyHandler(e);
    this.processNewCommand(e);
  }




}

