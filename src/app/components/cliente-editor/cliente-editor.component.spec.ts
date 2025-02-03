import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEditorComponent } from './cliente-editor.component';

describe('ClienteEditorComponent', () => {
  let component: ClienteEditorComponent;
  let fixture: ComponentFixture<ClienteEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
