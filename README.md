# altran-back-end-test

La aplicación no está completa, pero cumple con todo lo requerido para la prueba.
Digo que no está completa porque está pensada para tener muchas más funcionalidades de las que se requieren en la prueba, con el fin de poder usar esta misma prueba para mostrarla en otras postulaciones.

La razón de haber tardado más de lo previsto se debe a que he tenido muchas pruebas que hacer para distintas empresas.

En caso de que os parezca bien el resultado, os puedo decir que continuaré mejorando esta prueba y agregando más tests (me falta agregar un test de integración).

### Instrucciones para probar la aplicación

Como dije antes, la prueba no está como yo quiero que esté, por lo que probarla será más tedioso de lo que sería si estuviera completa, pero trataré de explicar lo mejor posible.

En cualquier directorio, abrir el terminal y correr `git clone https://github.com/olivaresvjuanp/altran-back-end-test.git`, luego, dentro de la carpeta `altran-back-end-test` ir al directorio `/src`, copiar el archivo `config-example.json` y pegarlo con el nombre `config.json`. Dentro de este archivo JSON pegar lo siguiente en `mongo.uri`: `mongodb://localhost:27017/altran-back-end-test`.

Una vez hecho todo esto, en el directorio principal, correr: `yarn` (con esto se instalarán las dependencias), luego de que termine, correr `yarn watch-ts`, y en paralelo `yarn start`.

Para probar el resultado de esta prueba es necesario hacer todo lo que dice aquí: https://github.com/olivaresvjuanp/altran-front-end-test#altran-front-end-test.

### Información adicional

Cuando la base de datos se conecta por primera vez obtiene todos los gnomos desde el enlace que se me dió en las instrucciones de la prueba front-end, y los  guarda en la base de datos.

Hay varios endpoints en la API que no están siendo utilizados, ya que falta avanzar en la prueba front-end, pero con herramientas como Postman se pueden probar.

Este README se irá actualizando a medida que vaya mejorando la prueba.
