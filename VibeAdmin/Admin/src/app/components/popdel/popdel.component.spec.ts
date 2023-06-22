import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopdelComponent } from './popdel.component';

describe('PopdelComponent', () => {
  let component: PopdelComponent;
  let fixture: ComponentFixture<PopdelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopdelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
