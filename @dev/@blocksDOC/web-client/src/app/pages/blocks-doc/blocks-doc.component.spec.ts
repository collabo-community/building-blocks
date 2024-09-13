import { ComponentFixture, TestBed } from '@angular/core/testing';

import BlocksDocComponent from './blocks-doc.component';

describe('BlocksDocComponent', () => {
  let component: BlocksDocComponent;
  let fixture: ComponentFixture<BlocksDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocksDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocksDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
