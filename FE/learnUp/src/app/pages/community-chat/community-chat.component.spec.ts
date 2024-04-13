import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityChatComponent } from './community-chat.component';

describe('CommunityChatComponent', () => {
  let component: CommunityChatComponent;
  let fixture: ComponentFixture<CommunityChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunityChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
