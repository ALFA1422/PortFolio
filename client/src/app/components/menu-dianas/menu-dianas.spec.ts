import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDianasComponent } from './menu-dianas';

describe('MenuDianasComponent', () => {
  let component: MenuDianasComponent;
  let fixture: ComponentFixture<MenuDianasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDianasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuDianasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
