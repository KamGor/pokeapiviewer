import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Habitats } from './habitats';

describe('Habitats', () => {
  let component: Habitats;
  let fixture: ComponentFixture<Habitats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Habitats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Habitats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
