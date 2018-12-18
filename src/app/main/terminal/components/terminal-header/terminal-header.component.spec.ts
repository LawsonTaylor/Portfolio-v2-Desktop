import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalHeaderComponent } from './terminal-header.component';

describe('TerminalHeaderComponent', () => {
  let component: TerminalHeaderComponent;
  let fixture: ComponentFixture<TerminalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
