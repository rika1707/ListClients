import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsFormsComponent } from './clients-forms.component';

describe('ClientsFormsComponent', () => {
  let component: ClientsFormsComponent;
  let fixture: ComponentFixture<ClientsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
