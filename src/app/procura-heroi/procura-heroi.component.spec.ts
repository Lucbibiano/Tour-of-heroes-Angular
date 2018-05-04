import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcuraHeroiComponent } from './procura-heroi.component';

describe('ProcuraHeroiComponent', () => {
  let component: ProcuraHeroiComponent;
  let fixture: ComponentFixture<ProcuraHeroiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcuraHeroiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcuraHeroiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
