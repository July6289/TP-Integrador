import { Component, viewChild,ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import ColorThief from 'colorthief';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  leftColumnColor: string = 'rgb(7, 130, 29)';
  rightColumnColor: string = 'rgb(7, 130, 29)';
  @ViewChild('center') centerElement!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef; // Referencia a la imagen

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const colorThief = new ColorThief();
          const img = this.imageElement.nativeElement;

          // Aseguramos que la imagen esté completamente cargada antes de usar ColorThief
          if (img.complete) {
            const dominantColor = colorThief.getColor(img);
            this.applyDominantColor(dominantColor);
          } else {
            img.addEventListener('load', () => {
              const dominantColor = colorThief.getColor(img);
              this.applyDominantColor(dominantColor);
            });
          }
        } else {
          this.resetColors();
        }
      });
    });

    if (this.centerElement) {
      observer.observe(this.centerElement.nativeElement);
    }
  }

  applyDominantColor(color: number[]) {
    const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    this.leftColumnColor = rgbColor;
    this.rightColumnColor = rgbColor;
  }

  resetColors() {
    this.leftColumnColor = 'rgb(7, 130, 29)';
    this.rightColumnColor = 'rgb(7, 130, 29)';
  }
}

