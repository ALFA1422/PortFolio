import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DianaBaseComponent } from './diana-base';

describe('DianaBase', () => {
  let component: DianaBaseComponent;
  let fixture: ComponentFixture<DianaBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DianaBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DianaBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
