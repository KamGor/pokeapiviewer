import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlingEffectsPageComponent } from './fling-effects-page.component';

describe('FlingEffectsPageComponent', () => {
  let component: FlingEffectsPageComponent;
  let fixture: ComponentFixture<FlingEffectsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlingEffectsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlingEffectsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
