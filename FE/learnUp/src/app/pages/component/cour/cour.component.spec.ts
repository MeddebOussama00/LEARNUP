import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourComponent } from './cour.component';

describe('CourComponent', () => {
  let component: CourComponent;
  let fixture: ComponentFixture<CourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
