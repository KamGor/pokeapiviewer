import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicPageComponent } from './characteristic-page.component';

describe('CharacteristicPageComponent', () => {
  let component: CharacteristicPageComponent;
  let fixture: ComponentFixture<CharacteristicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacteristicPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacteristicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
