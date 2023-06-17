import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycartsComponent } from './mycarts.component';

describe('MycartsComponent', () => {
  let component: MycartsComponent;
  let fixture: ComponentFixture<MycartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
