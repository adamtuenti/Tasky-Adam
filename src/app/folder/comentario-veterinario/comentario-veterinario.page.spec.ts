import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComentarioVeterinarioPage } from './comentario-veterinario.page';

describe('ComentarioVeterinarioPage', () => {
  let component: ComentarioVeterinarioPage;
  let fixture: ComponentFixture<ComentarioVeterinarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioVeterinarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComentarioVeterinarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
