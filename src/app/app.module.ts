import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDrawComponent } from './main/app-draw/app-draw.component';
import { TerminalComponent } from './main/terminal/terminal.component';
import { DesktopComponent } from './main/desktop/desktop.component';
import { TerminalHeaderComponent } from './main/terminal/components/terminal-header/terminal-header.component';
import { ResumeComponent } from './main/resume/resume.component';
import { SnakeComponent } from './main/snake/snake.component';
import { ContactComponent } from './main/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AppDrawComponent,
    TerminalComponent,
    DesktopComponent,
    TerminalHeaderComponent,
    ResumeComponent,
    SnakeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
