import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesFormComponent } from './matches-form.component';

describe('MatchesFormComponent', () => {
  let component: MatchesFormComponent;
  let fixture: ComponentFixture<MatchesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
