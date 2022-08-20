let pagina = 1
const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

btnSiguiente.addEventListener('click', () => {
    
    if(pagina <= 1000) {
        pagina++
        cargarPeliculas()
    }
})

btnAnterior.addEventListener('click', () => {

    if(pagina > 1) {
        pagina--
        cargarPeliculas()
    }
    
})

const cargarPeliculas = async () => {

    const api_key = '.|.'

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES&page=${pagina}`);
        // console.log(respuesta)

        if (respuesta.status === 200) {

            const datos=  await respuesta.json()
            // console.log(datos.results)

            let peliculas = ""
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="img película">  
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `
            })

            document.getElementById('contenedor').innerHTML = peliculas

        } else if(respuesta.status === 401) {
            console.log('Error de autenticación')
        } else if(respuesta.status === 404) {
            console.log('pelicula no encontrada')
        }

    } catch (error) {
        console.log(error)
    }
     
}

cargarPeliculas();