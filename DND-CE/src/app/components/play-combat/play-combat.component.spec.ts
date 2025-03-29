import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayCombatComponent } from './play-combat.component';

describe('PlayCombatComponent', () => {
  let component: PlayCombatComponent;
  let fixture: ComponentFixture<PlayCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayCombatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
