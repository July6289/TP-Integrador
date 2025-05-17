// src/app/services/tutorial.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class TutorialService {
  private mostrarTutorialSubject = new BehaviorSubject<boolean>(false);
  mostrarTutorial$ = this.mostrarTutorialSubject.asObservable();

  mostrarTutorial() {
    this.mostrarTutorialSubject.next(true);
  }

  ocultarTutorial() {
    this.mostrarTutorialSubject.next(false);
  }
}
