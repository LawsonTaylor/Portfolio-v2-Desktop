import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDrawComponent } from './app-draw.component';

describe('AppDrawComponent', () => {
  let component: AppDrawComponent;
  let fixture: ComponentFixture<AppDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
