# async-landing

Bienvenido/a a mi Landing Page de información de mi canal de Youtube. éste proyecto ha sido desarrollado con la finalidad de consumir la API de Youtube para presentar información de usuario como: Nombre de Usuario, últimos videos subidos, etc.

---
# UTILIZACIÓN DE LA API DE YOUTUBE:

["Enlace de la documentación de la API de Spotify en RapidApi"](https://rapidapi.com/ytdlfree/api/youtube-v31)

## Obtener datos generales del canal de Youtube:

Para obtener detalles del canal de Youtube, como el nombre del canal, la foto de perfil, etc, implementamos la siguiente función asíncrona

```js
// FUNCIÓN PARA DETALLES DEL CANAL DE YOUTUBE:
async function fetchDataDetails(url) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}
```

La misma que recibe la url del Endpoint de la API, en éste caso, del que retorna los datos generales del canal de Youtube. Dentro de ésta función hacemos uso de la función fetch, promesa a la cual enviamos la url y el objeto ```options``` en donde está especificado el tipo de petición (GET), la Api Key y la url de la API. Al tratarse de una promesa, recibiremos la data en ```response```, y la transformamos a formato .json, para finalmente almacenarla en la variable ```data```.

Una vez implementada dicha función asíncrona, creamos otra función que se auto-convocará a élla misma. 

```js
// DETALLES DE CANAL DE YOUTUBE:
(async () => {
    try {
        const details = await fetchDataDetails(URLAPIDETAILS);
        miNombre.innerHTML = `${details.items[0].snippet.title}`;
        miHandle.innerHTML = `${details.items[0].snippet.customUrl}`;
        imgCanal.src = `${details.items[0].snippet.thumbnails.high.url}`;
        enlaceCanal.href = `https://www.youtube.com/${details.items[0].snippet.customUrl}`;
    } catch (error) {
        console.log(error);
    }
})();
```

Dentro de élla, llamamos a la función asíncrona ```fetchDataDetails()``` y le enviamos la url del Endpoint que retorna los datos de los detalles del canal de Youtube. 

Ésta función nos retorna un objeto con todos los datos del canal, así que tomaremos todos ésos datos y los vamos escribiendo en los objetos HTML correspondientes, por ejemplo:

```js
const miNombre = document.getElementById("miNombre"); 
```

La constante ```miNombre``` hace referencia a un objeto HTML tipo ```<span>``` que mostrará el nombre del canal obtenido desde la API:

```html
<span class="block xl:inline" id="miNombre"></span>
```

Y dentro de la función, asignamos a dicho objeto el valor obtenido desde la API:

```js
miNombre.innerHTML = `${details.items[0].snippet.title}`;
```

Hacemos lo mismo con el resto de datos, como el handle del canal, o la foto de perfil.

---

## Obtener los 10 últimos videos subidos al canal de Youtube:

Para obtener los últimos videos subidos por el canal de youtube, primero creamos una función asíncrona que será la encargada de hacer el fetch:

```js
// FUNCIÓN PARA ULTIMOS VIDEOS PUBLICADOS:
async function fetchDataLastVideos(url) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}
```

Ésta función es la misma utilizada en el caso anterior en donde queremos obtener los datos generales del canal (De hecho ahora que escribo éste README, me doy cuenta que estoy redundando, y se podría usar la misma función para los dos casos). Asimismo, recibimos la url del Endpoint que retorna los datos de los últimos videos del canal, con la diferencia de que dicha url tiene un Query Param que establece el número máximo de videos que queremos retornar.

Luego, creamos otra función anónima que llame a la función ```fetchDataLastVideos()```, y que almacene los resultados retornados por élla en un objeto:

```js
// ULTIMOS VIDEOS CANAL DE YOUTUBE:
(async () => {
    try{
        const videos = await fetchDataLastVideos(URLAPIVIDEOS);
        let view = `
        ${videos.items.map(video => 
            `
            <a href="https://www.youtube.com/watch?v=${video.id.videoId}">
                <div class="group relative">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-400">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                        </h3>
                    </div>
                </div>
            </a>
            `
        ).slice(0,10).join('')}`;

        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();
```

Dentro de ésta función, la peculiaridad está en que mapeamos el arreglo que contiene los resultados, y por cada resultado, generamos en el DOM una "tarjeta" dentro de la cual estará la información de cada video retornado en el arreglo, como: miniatura del video, enlace del video, título del video. Al mapear éste arreglo, generamos algo similar a un ```*ngFor``` de Angular, en donde se crea un componente por cada video del arreglo de videos. Como se menciona anteriormente, al Endpoint se le envía el Query Param de 10, lo que significa que se nos retornará desde la API los últimos 10 videos subidos por el canal, así que generaremos 10 "tarjetas" dentro del DOM

---
# RESULTADOS:

[Link de la página desarrollada](https://davidcornejob.github.io/async-landing/)
