import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Abilities } from './abilities';

describe('Abilities', () => {
  let component: Abilities;
  let fixture: ComponentFixture<Abilities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abilities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Abilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
