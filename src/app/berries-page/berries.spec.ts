import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Berries } from './berries';

describe('Berries', () => {
  let component: Berries;
  let fixture: ComponentFixture<Berries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Berries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Berries);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
