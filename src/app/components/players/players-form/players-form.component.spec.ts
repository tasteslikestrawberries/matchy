import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersFormComponent } from './players-form.component';

describe('PlayersFormComponent', () => {
  let component: PlayersFormComponent;
  let fixture: ComponentFixture<PlayersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
