import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
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
  leftColumnColor: string = 'black';
  rightColumnColor: string = 'black';

  @ViewChild('center') centerElement!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef; // Referencia a la imagen

  images: string[] = [
    'assets/imagenes/cajas/1.png',
    'assets/imagenes/cajas/2.png', // Añade más imágenes aquí
    'assets/imagenes/cajas/3.png',
    'assets/imagenes/cajas/4.png',
    'assets/imagenes/cajas/5.png',
    'assets/imagenes/cajas/6.png',
    'assets/imagenes/cajas/7.png',
    'assets/imagenes/cajas/8.png',
    'assets/imagenes/cajas/9.png',
    'assets/imagenes/cajas/10.png',
    'assets/imagenes/cajas/11.png',
    'assets/imagenes/cajas/12.png',
    'assets/imagenes/cajas/13.png',
    'assets/imagenes/cajas/14.png',
    'assets/imagenes/cajas/15.png',
    'assets/imagenes/cajas/16.png',
    'assets/imagenes/cajas/17.png',
    'assets/imagenes/cajas/18.png',
    'assets/imagenes/cajas/19.png',
    'assets/imagenes/cajas/20.png',
    'assets/imagenes/cajas/21.png',
    'assets/imagenes/cajas/22.png',
    'assets/imagenes/cajas/23.png',
    'assets/imagenes/cajas/24.png',
    'assets/imagenes/cajas/25.png',
    'assets/imagenes/cajas/26.png',
    'assets/imagenes/cajas/27.png',
    'assets/imagenes/cajas/28.png',
    'assets/imagenes/cajas/29.png',
    'assets/imagenes/cajas/30.png',
    'assets/imagenes/cajas/31.png',
    'assets/imagenes/cajas/32.png',
  ];

  currentIndex: number = 0; // Índice actual
  currentImage: string = this.images[this.currentIndex]; // Imagen actual
  currentBoxName: string = "Caja 1";


  ngAfterViewInit() {
    this.observeCenterElement();
    this.updateDominantColor();
  }

  observeCenterElement() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateDominantColor();
        } else {
          this.resetColors();
        }
      });
    });

    if (this.centerElement) {
      observer.observe(this.centerElement.nativeElement);
    }
  }

  // Función para recalcular el color dominante
  updateDominantColor() {
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


  @ViewChild('center') ElementoCentral!: ElementRef;
  @ViewChild('imageElement') ElementoImagen!: ElementRef;


  // Función para ir a la imagen anterior
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;

    } else {
      this.currentIndex = this.images.length - 1; // Si está en la primera, va a la última
    }
    this.updateImageAndName()
  }

  // Función para ir a la siguiente imagen
  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Si está en la última, va a la primera
    }
    this.updateImageAndName()
  }

  updateImageAndName() {
    this.currentImage = this.images[this.currentIndex];
    this.currentBoxName = "Caja " + (this.currentIndex+1); // Actualiza el nombre de la caja
    this.updateDominantColor(); // Recalcula el color dominante
  }
}
