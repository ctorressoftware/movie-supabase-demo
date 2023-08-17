import { useState, useEffect } from 'react'
import './index.css'
import { supabase } from './lib/api';

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {

    const getMovies = async () => {

      let { data: movies, error } = await supabase
        .from('Movie')
        .select('*');

      setMovies(movies);
    }

    getMovies();

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('Movie')
      .insert([
        {name: form.nombrePelicula, description: form.descripcion, logoLink: form.linkLogo},
      ])
      .select()
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  return (
    <>

      <h1 className='text-blue-600'>Movie Demo App</h1>
      <hr/>
      <form autoComplete='false' onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre de la pelicula</label>
        <input id='nombrePelicula' name='nombrePelicula' onChange={handleChange} placeholder='Nombre de la pelicula' />

        <label htmlFor='linkLogo'>Foto de la pelicula</label>
        <input id='linkLogo' name='linkLogo' onChange={handleChange} placeholder='Foto de la pelicula' />

        <label htmlFor='descripcion'>Descripcion</label>
        <input id='descripcion' name='descripcion' onChange={handleChange} placeholder='Descripcion de la pelicula' />

        <input type='submit' />
      </form>
      
      <hr />

      <h1>Peliculas:</h1>

      {movies && movies.map(movie =>
        <article key={movie.id}>
          <p>{movie.name}</p>
          <img src={movie.logoLink} alt={`${movie.name} - ${movie.description}`} />
          <p>{movie.description}</p>
        </article>
      )}

    </>
  )
}

export default App
