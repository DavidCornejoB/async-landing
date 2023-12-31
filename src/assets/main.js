const miNombre = document.getElementById("miNombre");
const miHandle = document.getElementById("miHandle");
const miDescripcion = document.getElementById("miDescripcion");
const imgCanal = document.getElementById("imgCanal");
const enlaceCanal = document.getElementById("enlaceCanal");
const content = null || document.getElementById("content");

miDescripcion.innerHTML = `
<br />
<br />
Mi nombre es David Cornejo B, Ingeniero en Ciencias de la Computación.
<br />
<br />

Éste proyecto se trata de una landing page que utiliza las características Asíncronas de JavaScript 
mientras se consume la API de Youtube para traer información de mi canal: Nombre de usuario, Foto de perfil, Últimos videos subidos, etc.`;

// PARA OBTENER LOS DETALLES DEL CANAL DE YOUTUBE:
const URLAPIDETAILS = 'https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=UC5UMHwor07bkOxThNvrv4xg';
//PARA OBTENER LOS ULTIMOS VIDEOS PUBLICADOS:
const URLAPIVIDEOS = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC5UMHwor07bkOxThNvrv4xg&part=snippet%2Cid&order=date&maxResults=10';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7f9957d316mshe8a676c0e954363p1bb84fjsn6c7ee451e234',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

// FUNCIÓN PARA DETALLES DEL CANAL DE YOUTUBE:
async function fetchDataDetails(url) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

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

/**************************************************************************** */
/**************************************************************************** */

// FUNCIÓN PARA ULTIMOS VIDEOS PUBLICADOS:
async function fetchDataLastVideos(url) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

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
