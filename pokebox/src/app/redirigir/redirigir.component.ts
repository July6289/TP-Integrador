import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-redirigir',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './redirigir.component.html',
  styleUrl: './redirigir.component.css'
})
export class RedirigirComponent implements OnInit {
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  ngOnInit() {
    // Captura los parámetros mode y oobCode
    const mode    = this.route.snapshot.queryParamMap.get('mode');
    const oobCode = this.route.snapshot.queryParamMap.get('oobCode');

    // Si faltan, redirige a la página principal
    if (!mode || !oobCode) {
      this.router.navigate(['/main-page']);
      return;
    }

    // Redirige según el modo
    switch (mode) {
      case 'resetPassword':
        this.router.navigate(['/cambiar-contra'], { queryParams: { oobCode } });
        break;
      case 'verifyEmail':
        this.router.navigate(['/usuario-verificado'], { queryParams: { oobCode } });
        break;
      default:
        this.router.navigate(['/main-page']);
        break;
    }
  }


}
