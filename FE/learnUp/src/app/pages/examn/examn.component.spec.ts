import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamnComponent } from './examn.component';

describe('ExamnComponent', () => {
  let component: ExamnComponent;
  let fixture: ComponentFixture<ExamnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
