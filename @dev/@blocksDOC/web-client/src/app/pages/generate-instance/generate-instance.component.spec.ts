import { ComponentFixture, TestBed } from '@angular/core/testing';

import GenerateInstanceComponent from './generate-instance.component';

describe('GenerateInstanceComponent', () => {
  let component: GenerateInstanceComponent;
  let fixture: ComponentFixture<GenerateInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateInstanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
