import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

const SPEED = 14;

class SBody {
  public color: string;
  public y: number;
  public x: number;
  public direction: string;
  public width: number;
  public height: number;

  constructor(x, y, d) {
    this.color = '#0FA';
    this.width = 16;
    this.height = 16;
    this.x = x;
    this.y = y;
    this.direction = d;
  }

  move(x, y) {
    this.x = x;
    this. y = y;
  }
}

class Snake {
  public body: [SBody];
  public direction: string;

  draw(drawBody: Function) {
    this.body.forEach(b => drawBody(b.x, b.y, b.width, b.height, b.color));
  }

  getHead() {
    return [this.body[0].x, this.body[0].y];
  }

}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

  public snake: Snake;

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public canvas: any;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.keyPress(event);
  }

  constructor() {
    this.canvas = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.canvas.getContext('2d');
    this.snake = new Snake();
  }

  ngOnInit() {

  }

  drawBody(x, y, w, h, c) {
    this.canvas.fillStyle = c;
    this.canvas.fillRect(x, y, w, h);
  }

  keyPress(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 38:
      this.snake.body[0].direction = 'up';
      break;
    case 37:
      this.snake.body[0].direction = 'left';
      break;
    case 39:
      this.snake.body[0].direction = 'right';
      break;
    case 40:
      this.snake.body[0].direction = 'down';
      break;
    default:
    }
  }

}
