import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { LauncherService } from '../../shared/launcher.service';

const SPEED = 14;
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;

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
    this.y = y;
  }
}

class Snake {
  public body: [SBody];
  public direction: string;

  constructor() {
    this.body = [new SBody(200, 200, 'up')];
    for (let b = 1; b < 4; b++) {
      this.body.push(new SBody(200, 200 + b * 16, 'up'));
    }
    this.direction = 'up';
  }

  draw(canvas) {
    this.body.forEach(b => {
      canvas.fillStyle = b.color;
      canvas.fillRect(b.x, b.y, b.width, b.height);
    });
  }

  getHead() {
    return [this.body[0].x, this.body[0].y];
  }

  growSnake() {
    const tail = this.body[this.body.length - 1];
    this.body.push(new SBody(tail.x, tail.y, tail.direction));
  }

  move() {
    for (let i = this.body.length - 1; i >= 0; i--) {
      if (i === 0) {
        switch (this.body[0].direction) {
          case 'left':
            this.body[i].x -= 16;
            break;
          case 'right':
            this.body[i].x += 16;
            break;
          case 'up':
            this.body[i].y -= 16;
            break;
          case 'down':
            this.body[i].y += 16;
            break;
        }
      } else {
        this.body[i].x = this.body[i - 1].x;
        this.body[i].y = this.body[i - 1].y;
      }
    }
  }

}

class Food {
  public color: string;
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(x, y) {
    this.color = 'red';
    this.width = 12;
    this.height = 12;
    this.x = x;
    this.y = y;
  }

  draw(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }

}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

  public snake: Snake;
  public score: number;
  public food: Food;
  private inGame: boolean;
  public startButton: string;

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public canvas: any;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.keyPress(event);
  }

  constructor(private launcherService: LauncherService) {
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.score = 0;
    this.food = new Food(150, 150);
    this.inGame = false;
    this.startButton = 'inline';
    this.close = this.close.bind(this);
  }

  ngOnInit() {
    this.canvas = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.snake = new Snake();

    setInterval(() => this.gameLoop(this.update, this.draw), 1000 / SPEED);

  }

  gameLoop(update, draw) {
    if (this.inGame) {
      update();
      draw();
    }
  }

  update() {
    this.checkBounds();
    this.ifFood();
    this.isBitten();
    this.snake.move();
  }

  draw() {
    this.canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.canvas.fillStyle = '#000';
    this.snake.draw(this.canvas);
    this.food.draw(this.canvas);
  }

  startGame() {
    this.inGame = true;
    this.startButton = 'inGame';
  }

  isBitten() {
    const head = this.snake.getHead();
    for (let bo = 1; bo < this.snake.body.length; bo++) {
      const x = this.snake.body[bo].x;
      const y = this.snake.body[bo].y;
      const bx = x - 10 < head[0] && head[0] < x + 10;
      const by = y - 10 < head[1] && head[1] < y + 10;
      if (bx && by) {
        this.endGame();
      }
    }
  }

  endGame() {
    this.score = 0;
    this.snake = new Snake();
    this.inGame = false;
    this.startButton = 'inline';
  }

  ifFood() {
    const head = this.snake.getHead();
    const x = head[0] + 16 > this.food.x && this.food.x > head[0] - 16;
    const y = head[1] + 16 > this.food.y && this.food.y > head[1] - 16;

    if (x && y) {
      let fx = 16 + (420 - 32) * Math.random();
      let fy = 16 + (320 - 32) * Math.random();
      while (this.collide(head[0], head[1], fx, fy)) {
        fx = 16 + (420 - 32) * Math.random();
        fy = 16 + (320 - 32) * Math.random();
      }
      this.food.x = fx;
      this.food.y = fy;
      console.log('grew');
      this.score += 1;
      this.snake.growSnake();
    }
  }

  collide(sx, sy, fx, fy) {
    return (sx - 16 < fx && fx < sx + 16) || (sy - 16 < fy && fy < sy + 16);
  }

  checkBounds() {
    const head = this.snake.getHead();

    if (head[1] >= 320) {
      this.snake.body[0].y = 0;
    }
    if (head[1] <= -16) {
      this.snake.body[0].y = CANVAS_HEIGHT;
    }
    if (head[0] <= -16) {
      this.snake.body[0].x = CANVAS_WIDTH;
    }
    if (head[0] >= 480) {
      this.snake.body[0].x = 0;
    }
  }

  keyPress(event: KeyboardEvent) {
    console.log(event.keyCode);
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

  close() {
    this.endGame();
    this.launcherService.toggleSnake();
  }

}
