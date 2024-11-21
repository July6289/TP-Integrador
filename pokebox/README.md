# Pokebox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Iniciar el Proyecto

Para Iniciar el proyecto es necesario tener dos consolas activas, una levantara el json-server y otra el proyecto de Angular

Lo primero de todo es verificar si nos encontramos en la ruta correcta, por ejemplo: "C:\Users\Usuario\Documents\GitHub\TP-Integrador\pokebox"

Despues de situarnos en la carpeta correcta que debemos hacer es levantar un json-server (debes instalarlo previamente usando  `npm i -g json-server`), para esto, en la otra consola que abrimos, nos situaremos en la ruta donde se encuentra el archivo json de Usuarios (Por ejemplo: "C:\Users\Usuario\Documents\GitHub\TP-Integrador\pokebox\db". Si no te encuentras en esta carpeta y no sabes como abrirla en la consola usa el comando `cd` seguido se la ruta). Una vez alli usaremes el comando `json-server Usuario.json` para activar el servidor. Abre tu navegador y ve hacia `http://localhost:3000/` para comprobar si esta activo.

Luego de levantar el json-server, escribe en la consola principal el siguiente comando `ng serve -o` para levantar el proyecto de Angular. Abre el tu navegador y ve hacia `http://localhost:4200/`. La aplicacion se recargara automaricamente si haces un cambio en los archivos del programa.

## Primeros pasos

Para poder usar la pagina web, es necesario tener una cuenta creada previamente, si no la tienes, apreta el boton "registrarse" y completa el formulario, una vez terminado puedes iniciar secion con el otro boton.

## Combate

para poder iniciar un combate es requisito que el se tenga como minimo un (1) equipo Pokemon previamente creado, por lo que es necesario que primero pases por la pestaña de creacion de equipos.

## Sobre Nosotros

Somos un equipo de 3 personas conformado por: 
- Julian Auteri (July6289)
- Lucas Hourcade (malotes-en-el-techo)
- Nicolas Nieto (N1colasnieto)

##Atencion

En el componente "caja", al inicializar el usuario, las cajas guardadas en el json aparecen como indefinidas generando un error en la consola, sin embargo, esto no es asi, ya que datos de las cajas se inicializan y guardan correctamente ya que se percibe una persistencia real en los pokemon de la caja.
