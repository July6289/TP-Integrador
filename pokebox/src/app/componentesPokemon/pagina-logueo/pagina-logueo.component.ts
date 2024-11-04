import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-logueo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pagina-logueo.component.html',
  styleUrl: './pagina-logueo.component.css'
})
export class PaginaLogueoComponent {


  fb=inject(FormBuilder)

  formulario=this.fb.nonNullable.group(
    {



    }
  )


}
