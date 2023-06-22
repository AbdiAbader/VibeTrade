import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdelComponent } from './userdel.component';

describe('UserdelComponent', () => {
  let component: UserdelComponent;
  let fixture: ComponentFixture<UserdelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
