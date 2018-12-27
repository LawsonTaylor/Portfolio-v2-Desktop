import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

interface IDocument {
  name: string;
  html: string;
  hidden: boolean;
}


const LAWSON_DETAILS = `
    <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
      <th>Eye Colour</th>
      <th>Height</th>
      <th>Nationality</th>
    </tr>
    <tr>
      <td>Lawson</td>
      <td>Taylor</td>
      <td>24</td>
      <td>Blue</td>
      <td>1.76m</td>
      <td>Australian</td>
    </tr>
    </table>`;

    const INFO = `
&nbsp&nbsp&nbsp&nbsp&nbsp_________ </br>
&nbsp&nbsp&nbsp&nbsp/ ======= \\ </br>
&nbsp&nbsp&nbsp/ __________\\ </br>
&nbsp&nbsp| ___________ |</br>
&nbsp&nbsp| |&nbsp-&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp| |</br>
&nbsp&nbsp| |&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp| |</br>
&nbsp&nbsp| |_________| |_______________________</br>
&nbsp&nbsp\\=____________/&nbsp&nbsp&nbsp&nbsp&nbspLawson Taylor&nbsp&nbsp&nbsp&nbsp&nbsp)</br>
&nbsp&nbsp/&nbsp""""""""""" \\&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp/</br>
&nbsp/&nbsp::::::::::::: \\&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp=D-'</br>
(_________________)</br>
-------------------------------------------------------------------
Welcome to my portfolio site. </br>
I hope you enjoy my work. </br>
Feel free to play around with the terminal or contact me at <a href="mailto:lawson.taylor@protonmail.com?Subject=Hello%20World" target="top">lawson.j.taylor@gmail.com</a>
`;

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
  private docs: Array<IDocument>;

  constructor(private hostElement: ElementRef) {
    this.history = [];
    this.histpos = 0;
    this.user = 'guest@lawsonOS:~$';
    this.docs = [
      {
        name: '.test',
        html: '<p>This is a hidden test document</p>',
        hidden: true,
      },
      {
        name: 'lawson-details',
        html: LAWSON_DETAILS,
        hidden: false,
      }
    ];
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
        'cat', 'clear', 'echo', 'help', 'info', 'ls'
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
        args = this.value.split(' ').filter(function (val, i) {
          return val;
        });
        cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      switch (cmd) {
        case 'cat':
          this.cat(args);
          break;
        case 'clear':
          this.output_.nativeElement.innerHTML = '';
          this.value = '';
          return;
        case 'echo':
          this.output(args.join(' '));
          break;
        case 'help':
          this.output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'uname':
          this.output(navigator.appVersion);
          break;
        case 'info':
          const result = 'lawson';
          this.output(INFO);
          break;
        case 'ls':
          this.list(args);
          break;
        default:
          if (cmd) {
            this.output(cmd + ': command not found');
          }
      }

      this.terminal_.nativeElement.scrollIntoView({ behavior: 'instant', block: 'end', inline: 'nearest' });
      this.value = ''; // Clear/setup line for next input.
    }
  }

  list(args) {
    const showHidden = args[0];
    for (const doc of this.docs) {
      if (doc.hidden) {
        if (showHidden) {
          this.output(doc.name);
        }
      } else {
        this.output(doc.name);
      }
    }
  }

  cat(args) {
    const fileName = args[0];
    for (const doc of this.docs) {
      if (doc.name === fileName) {
        this.output(doc.html);
      }
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

