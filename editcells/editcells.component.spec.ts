import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcellsComponent } from './editcells.component';

describe('EditcellsComponent', () => {
  let component: EditcellsComponent;
  let fixture: ComponentFixture<EditcellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
