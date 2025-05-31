import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.css'
})

export class TutorialComponent implements OnInit {
  protected pagina = {
    titulo: "",
    imagen: "",
    texto: "",
    nroPagina: 1
  };

  ngOnInit(): void {
    this.menuPaginas();
  }

  cambiarPaginaAdelante() {
    if (this.pagina.nroPagina <= 19) {
      this.pagina.nroPagina += 1;
      this.menuPaginas();
    }
    else {
      this.pagina.nroPagina = 1;
      this.menuPaginas();
    }
  }

  cambiarPaginaAtras() {
    if (this.pagina.nroPagina >= 2) {
      this.pagina.nroPagina -= 1;
      this.menuPaginas();
    }
    else {
      this.pagina.nroPagina = 20;
      this.menuPaginas();
    }
  }

  menuPaginas() {
    switch (this.pagina.nroPagina) {
      case 1:
        this.pagina.titulo = "Introducción";
        this.pagina.imagen = "/assets/imagenes/tutorial/1.1.png";
        this.pagina.texto = "Me presento, mi nombre es el Profesor Oak. Bienvenido a pokebox! En esta página podrás hacer un seguimiento de tu partida en el navegador de tu pc. Podrás guardar los pokémon que hayas capturado así como los objetos que lleves en la mochila e incluso hacer simulaciones de combate básicas para aprender y entender mejor cómo jugar de forma más efectiva.";
        break;
      case 2:
        this.pagina.titulo = "Lista de pokémon";
        this.pagina.imagen = "/assets/imagenes/tutorial/2.2.png";
        this.pagina.texto = "Para guardar los pokémon que quieras deberás usar la lista pokemon que funciona buscando pokemon por generación.\nA la derecha de la página, verás un rectángulo donde podrás escribir el número de esta y, al apretar el botón “buscar”, o presionando enter en tu teclado, te mostrará los pokémon originarios de la región correspondiente. Al hacer un click podrás seleccionarlo y luego apretar el botón que está debajo de la lista o haciendo doble click para así ingresarlo a la caja; esta se encuentra en la parte central de la pantalla.";
        break;
      case 3:
        this.pagina.titulo = "Caja de pokémon";
        this.pagina.imagen = "/assets/imagenes/tutorial/3.png";
        this.pagina.texto = "Los pokémon que guardes en tu caja podrán ser seleccionados haciendo click en ellos. Si haces click derecho en un pokémon puedes agregarlo a favoritos o eliminarlo de la caja. En cada caja puedes poner un máximo de 30 pokemon.\nAdemás puedes cambiar de caja apretando los botones laterales a esta.";
        break;
      case 4:
        this.pagina.titulo = "Controles del pokémon";
        this.pagina.imagen = "/assets/imagenes/tutorial/4.png";
        this.pagina.texto = "Cuando seleccionas a un pokémon que está en la caja este aparecerá también a la izquierda de la página web, ahí podrás ver su nombre y su sprite. Debajo de él tendrás 3 botones que te permitirán cambiar este último. Los botones macho y hembra cambiaran el sprite mostrando sus variantes por sexo (si es que estas existen), mientras que el botón shiny mostrará su version variocolor (el mismo pokemon con una rara variación de color presente en los juegos originales).";
        break;
      case 5:
        this.pagina.titulo = "Favoritos";
        this.pagina.imagen = "/assets/imagenes/tutorial/5.png";
        this.pagina.texto = "En este espacio podrás guardar hasta 6 de tus pokémon favoritos de la manera que se explicó en el paso 2 para que estén fijados en la página principal.\nHaciendo click derecho sobre cualquiera de ellos podrás eliminarlo para cambiarlo por otro.";
        break;
      case 6:
        this.pagina.titulo = "Lista de equipos pokémon";
        this.pagina.imagen = "/assets/imagenes/tutorial/6.png";
        this.pagina.texto = "Debajo de info-pokédex tendrás un botón que dice agregar equipo. Al apretarlo podrás crear equipos pokémon con los cuales podrás luchar combates simulados.\nUna vez creado un equipo podrás realizar 3 acciones, apretar el botón de cambiar el nombre para renombrarlo, presionar el botón eliminar para borrar tu equipo o hacer click sobre su nombre para visualizarlo.";
        break;
      case 7:
        this.pagina.titulo = "Creador de equipos pokémon";
        this.pagina.imagen = "/assets/imagenes/tutorial/7.png";
        this.pagina.texto = "Al igual que en la lista pokémon, debes poner el número de la generación y apretar en el botón buscar para que te aparezcan todos los pokémon de la región correspondiente. Luego puedes hacer un click en un pokémon para seleccionarlo y luego otro en el botón agregar pokémon (o hacer doble click sobre él) para sumarlo al equipo, este debe tener 6 pokémon si o si. Una vez seleccionados todos aprietas el botón guardar equipo, allí le pondrás un nombre y estará listo para el combate. Cuando desees dejar de crear equipos aprietas el botón volver al menú principal para volver atrás.";
        break;
      case 8:
        this.pagina.titulo = "Visualizar pokémon del equipo";
        this.pagina.imagen = "/assets/imagenes/tutorial/8.png";
        this.pagina.texto = "Aquí podrás ver los pokémon de tu equipo, además si haces click en uno puedes cambiarle el nombre.\nCuando hayas terminado puedes salir de aquí apretando el botón ir al menú principal o el botón ir a combate.";
        break;
      case 9:
        this.pagina.titulo = "Como ir a combatir";
        this.pagina.imagen = "/assets/imagenes/tutorial/9.png";
        this.pagina.texto = "Una vez creado tu equipo puedes apretar el botón “combate”, situado en la esquina inferior izquierda, para iniciar una pelea pokemon.";
        break;
      case 10:
        this.pagina.titulo = "Elegir pokémon para el combate";
        this.pagina.imagen = "/assets/imagenes/tutorial/10.png";
        this.pagina.texto = "Antes de poder iniciar el combate propiamente dicho deberás elegir uno de tus equipos previamente creados. Lo único que debes hacer es apretar el botón seleccionar equipo que está dentro de la barra azul que tiene el nombre del equipo con el que te interesa combatir.\nTambién puede apretar el botón detalles si quieres ver que pokemones posee ese equipo.\nSi no deseas combatir puedes apretar el botón volver, situado abajo del todo en el centro de la página.";
        break;
      case 11:
        this.pagina.titulo = "Barra de navegación";
        this.pagina.imagen = "/assets/imagenes/tutorial/11.png";
        this.pagina.texto = "En la parte superior de la pantalla se encuentra la barra de navegación que te acompañará por toda la página web. En esta verás un botón que dice “home” con el cual puedes volver al menú principal, también hay otro al lado llamado “perfil” que te permite ir a ver tu perfil, otro llamado “objetos” que te permite ir a la “lista de objetos de pokémon”, por último, a la derecha, se encuentra el botón para cerrar la sesión.";
        break;
      case 12:
        this.pagina.titulo = "Perfil";
        this.pagina.imagen = "/assets/imagenes/tutorial/12.png";
        this.pagina.texto = "Dentro del perfil podrás ver tu mail, tu contraseña y tus combates ganados, además puedes modificar tu contraseña y tu email (excepto si entraste por google) o eliminar tu cuenta con su respectivo botón.";
        break;
      case 13:
        this.pagina.titulo = "Lista de objetos";
        this.pagina.imagen = "/assets/imagenes/tutorial/13.png";
        this.pagina.texto = "En esta parte de la página podrás hacer una lista con todos los objetos que tengas en tus juegos pokemon, con las cantidades que tengas.";
        break;
      case 14:
        this.pagina.titulo = "Buscador de objetos";
        this.pagina.imagen = "/assets/imagenes/tutorial/14.png";
        this.pagina.texto = "En la derecha de la página podrás observar un recuadro blanco con un botón que dice buscar, en ese recuadro tienes que escribir el nombre del objeto (o parte de este) y luego apretar el botón o presionar enter. Te aparecerá una lista con todos los ítem que se llamen así. Estos tendrán su imagen, nombre, un cuadro donde podrás escribir la cantidad a agregar (máximo 99) y un botón que dice “agregar” para guardarlo en tu lista de objetos.";
        break;
      case 15:
        this.pagina.titulo = "Inventario de tus objetos";
        this.pagina.imagen = "/assets/imagenes/tutorial/15.png";
        this.pagina.texto = "Aquí se verán almacenados todos los objetos que vayas guardando en tu inventario.\nUna vez agregados objetos a la lista, en el centro de la página, podrás ver su imagen, nombre y cantidad. Además tendrás un botón llamado cambiar cantidad que cambia la cantidad de ese objeto (máximo 99) y otro llamado eliminar para sacarlo de la lista.";
        break;
      case 16:
        this.pagina.titulo = "Informacion detallada de tus objetos";
        this.pagina.imagen = "/assets/imagenes/tutorial/16.png";
        this.pagina.texto = "Si clickeas un objeto que tengas en tu lista de objetos a la izquierda de la página podrás ver detalles adicionales de este como su nombre, su imagen en mayor calidad y su descripción en su juego.";
        break;
      case 17:
        this.pagina.titulo = "HUD del combate";
        this.pagina.imagen = "/assets/imagenes/tutorial/17.png";
        this.pagina.texto = "En combate podrás realizar combates simulados y simplificados, donde los jugadores verán a su pokémon abajo, con su barra de vida a su derecha (todos los pokemones tienen 16 de vida); y arriba al pokémon rival con su barra de vida a la izquierda.";
        break;
      case 18:
        this.pagina.titulo = "Que puedes hacer al combatir";
        this.pagina.imagen = "/assets/imagenes/tutorial/18.png";
        this.pagina.texto = "Tendrás 3 botones:\nFight, en el cual ambos pokémon se atacarán; el tuyo irá primero y luego el del rival.\nPokemon, en el cual podrás cambiar tu pokémon actual por otro, sin embargo al hacer esto el orden de los turnos se da vuelta.\nRun, al apretarlo, abandonas el combate.";
        break;
      case 19:
        this.pagina.titulo = "Selector de pokemon para el combate";
        this.pagina.imagen = "/assets/imagenes/tutorial/19.png";
        this.pagina.texto = "Una vez aprietes el botón pokemon, entraras a esta pagina donde arriba del todo te aparecerá el nombre de tu pokémon actual y el del pokémon rival. Además verás una lista con los 6 pokémon de tu equipo, cada uno tendrá su imagen, nombre, sus tipos y un botón que te permite elegirlo para el combate. En caso de no querer cambiar de pokémon apriete el botón volver, en la parte inferior izquierda de la pantalla, apretar este botón no cambiaría el orden de turnos.";
        break;
      case 20:
        this.pagina.titulo = "Detalles para ganar el combate";
        this.pagina.imagen = "/assets/imagenes/tutorial/20.png";
        this.pagina.texto = "Para ganar el combate deberás derrotar a los 6 pokémon del rival sin que derroten los 6 tuyos. es importante entender que cada pokémon tiene 1 o 2 tipos y que estos tipos pueden hacer más, menos o ningún daño a otros tipos. Por lo que aprender qué tipos tienen tus pokémon, los del rival y cuales son efectivos contra otros es muy importante para alcanzar la victoria.";
        break;
      default:
        console.log("como llegaste aca?");
        break;

    }
  }
}
