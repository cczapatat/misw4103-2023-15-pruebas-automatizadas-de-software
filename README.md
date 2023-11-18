# Bienvenido al Readme de **misw4103-2023-15-pruebas-automatizadas-de-software**

## Intregantes del equipo

|Integrante | Email uniandes | Usuario github |
|-----------|----------------|----------------|
| Jhon Muñoz | je.munozr1@uniandes.edu.co | @icgodmemAndes |
| Cristian Eduardo Parada Criales | c.paradac@uniandes.edu.co | @cparadac |
| Juan Carlos Torres | jc.torresm1@uniandes.edu.co | @jctorresm1 |
| Cristian Camilo Zapata Torres | c.zapatat@uniandes.edu.co | @cczapatat |

## Evidencias Reportes

[Link Semana 5](https://uniandes-my.sharepoint.com/:f:/g/personal/c_zapatat_uniandes_edu_co/EnUNGiY18TlHggg4oBkc2o0B9Ac1OewDzjArNLharPirXg?e=aVX2by)

[Link Semana 6](https://uniandes-my.sharepoint.com/:f:/g/personal/c_zapatat_uniandes_edu_co/EtNqBJCW8UxCrJRyCIidgUcBfv7fJsM4KGApa4DDwOPU6Q?e=YCkAHl)

## Instrucciones

A continuación se mencionaran pasos, requisitos y consideraciones importantes para correr los escenarios de prueba de los diferentes proyectos en Kraken y Cypress.

### Requisitos Generales

Estos requisitos son aplicables a los escenarios de ambos proyectos (Kraken y Cypress).

* Se requiere tener NodeJs y NPM instalados, aquí recomendamos utilizar [NVM](https://github.com/nvm-sh/nvm), ya que cada proyecto usa una versión diferente de NodeJs.

* Se requiere contar con el aplicativo Ghost en las siguientes versiones **5.68.0** y **5.8.0**.

```bash
docker run -d -e url=http://localhost:3100 -p 3100:2368 --name ghost_5.8 ghost:5.8
```

```bash
docker run -d --name ghost_5.68.0 -e NODE_ENV=development -e url=http://localhost:2368 -p 2368:2368 ghost:5.68.0
```

* Ingresar a cada URL donde está ejecutandose Ghost y al final de la URL escribir **/ghost**, lo cual es la vista como administrador.

```sh
http://localhost:2368/ghost
```

```sh
http://localhost:3100/ghost
```

* Utilice esta misma URL y ajustela en los archivos de configuración de cada proyectos *cypress.config.js* y *kraken.config.js*

* Si es la primer vez que ingresa se le solicitará crear un administrador, importante crear el administrador con los siguientes datos, ya que estos son los datos con los que se ejecutan los escenarios. *Si ya tiene un administrador creado debera cambiar las credenciales en los archivos de configuración de cada proyecto*

```json
{
  "site": "Ghost",
  "name": "admin",
  "email": "admin@email.com",
  "password": "pruebasE2E",
}
```

* Posterior a la instalación de Ghost podra ir a los diferentes aplicativos de Cypress y Kraken, en los cuales encontrará dos posibles comandos uno para cada versión de ghost y sistema operativo.
* * Los comandos terminados en **:new** hacen referencia al versión de Ghost **5.68.0**
* * Los comandos terminados en **:old** hacen referencia al versión de Ghost **5.8.0**

### Correr pruebas Cypress

#### Requisitos

* NodeJs en versión **18.18.2**
* NPM en versión **9.8.1**
* Cypress en version **13.3.0**

#### Pasos

* Ubicarse en la carpeta de *cypress*

```sh
cd cypress
```

* Instalar node en la versión **18.18.2**

```bash
nvm install 18.18.2
```

```bash
nvm use 18.18.2
```

* Instalar Cypress de forma global

```bash
npm install -g cypress
```

* Instalar dependecias del proyecto

```bash
npm install
```

##### Ejecución proyecto Cypress

###### Modo interactivo

Lista de comandos:

Unix

```bash
npm run cypressos:new
```

```bash
npm run cypressos:old
```

Windows

```bash
npm run cypresswin:new
```

```bash
npm run cypresswin:old
```

* Seleccionar E2E
* Agregar el folder de cypress al arbol de proyectos
* Seleccionar el navegador chrome
* seleccionar los escenarios a correr

*Para mayor información sobre como ejecutar un proyecto Cypress puede dirigirse a la siguiente*

[Guia](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/cypress-tutorial/index.html#0)

### Correr pruebas Kraken

#### Requisitos

* NodeJs en versión **16.20.2**
* NPM en versión **8.19.4**
* Kraken en version **1.0.24**

#### Consideraciones

* Tener [Java](https://www.oracle.com/java/technologies/downloads/#java17) en version **17.0.7**
* Tener instalado el [SDK de Android](https://developer.android.com/studio)
![SDK Manager](./imgs/androidSDK1.png)
![SDK Tools](./imgs/androidSDK2.png)
* Tener instalado el ADB de Android
* Tener instalado el APPT de Android
* Tener configuradas las variables de JAVA_HOME y ANDROID_HOME ([Link ejemplo](https://stackoverflow.com/questions/28296237/set-android-home-environment-variable-in-mac))
* Tener instalado Appium forma global

#### Pasos

* Ubicarse en la carpeta de *kraken*

```sh
cd kraken
```

* Instalar node en la versión **16.20.2**

```bash
nvm install 16.20.2
```

```bash
nvm use 16.20.2
```

* Instalar Kraken de forma global

```bash
npm install kraken-node -g
```

* Instalar dependecias del proyecto

```bash
npm install
```

* Instalar Appium de forma global

```bash
npm install -g appium
```

* Ejecutar el siguiente comando para validar dependencias.

```bash
npx kraken-node doctor
```

![Dependencias OK](./imgs/dependenciasKrakenOK.png)

*Para mayor información sobre como ejecutar un proyecto Kraken puede dirigirse a la siguiente*

[Guia](https://thesoftwaredesignlab.github.io/AutTestingCodelabs/kraken-web-testing-tool/index.html#0)

* Ejecutar escenarios de prueba

Lista de comandos:

Unix

```bash
npm run krakenos:new
```

```bash
npm run krakenos:old
```

Windows

##### Consideraciones

**Para la ejecución en windows dentro de la carpeta features solo se debe tener un archivo con extensión .feature, y solo un feature dentro del mismo archivo**

```bash
npm run krakenwin:new
```

```bash
npm run krakenwin:old
```

**Para la ejecución de multiples archivos scenario_X.feature en WINDOWS se DEBE ejecutar el siguiente commando que actualiza los nombres de los archivos .feature y se ejecute el commando krakenwin por cada archivo .feature. Si se presenta algún error o cancela el comando, los archivos quedaran renombrados con .featured y sera necesario renombrarlos a su nombre inicial**

```bash
npm run krakenwinmulti:new
```

```bash
npm run krakenwinmulti:old
```

### VRT

### Correr Backstop

#### Requisitos

* NodeJs en versión **16.20.2**
* NPM en versión **8.19.4**

#### Pasos

* Ubicarse en la carpeta de *backstop*

```sh
cd backstop
```

* Instalar node en la versión **16.20.2**

```bash
nvm install 16.20.2
```

```bash
nvm use 16.20.2
```

* Instalar Kraken de forma global

```bash
npm install -g backstopjs
```

* Ejecutar uno de los siguientes comandos de acuerdo al sistema operativo.

Unix

* * Generar imagen referencia

```bash
npm run backstopos:ref
```

* * Generar imagen comparación

```bash
npm run backstopos:test
```

* * Puede también ejecutar ambos comandos solo corriendo.

```bash
npm run backstopos
```

Windows

* * Generar imagen referencia

```bash
npm run backstopwin:ref
```

* * Generar imagen comparación

```bash
npm run backstopwin:test
```

* * Puede también ejecutar ambos comandos solo corriendo.

```bash
npm run backstopwin
```

* Al finalizar los comandos sino se visualiza el reporte directo en el navegador puede desplegar el archivo de la ruta

```sh
backstop/backstop_data/html_report/index.html
```

### Correr Resemblejs

#### Requisitos

* NodeJs en versión **18.18.2**
* NPM en versión **9.8.1**
* Haber ejecutado el proyecto Cypress en ambas versiones (**new** y **old**)

#### Pasos

* Ubicarse en la carpeta de *cypress*

```sh
cd cypress
```

* Instalar node en la versión **18.18.2**

```bash
nvm install 18.18.2
```

```bash
nvm use 18.18.2
```

* Instalar dependencias

```bash
npm install
```

* Ejecutar resembleJs.

```bash
npm run resemble:run
```

* Al finalizar deberá desplegar el archivo que esta en la siguiente ruta

```sh
cypress/vrt/results/report.html
```
