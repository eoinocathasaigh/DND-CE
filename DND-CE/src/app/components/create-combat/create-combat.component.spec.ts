import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCombatComponent } from './create-combat.component';

describe('CreateCombatComponent', () => {
  let component: CreateCombatComponent;
  let fixture: ComponentFixture<CreateCombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCombatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
