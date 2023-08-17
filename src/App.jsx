import { useState, useEffect } from 'react'
import './index.css'
import { supabase } from './lib/api';

function App() {
  const [movies, setMovies] = useState([]);
  const [refreshMovies, setRefreshMovies] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {

    const getMovies = async () => {

      let { data: movies, error } = await supabase
        .from('Movie')
        .select('*');

      setMovies(movies);
    }

    getMovies();

  }, [refreshMovies])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await uploadFile(form.logo);

    console.log(response);

    const { data, error } = await supabase
      .from('Movie')
      .insert([
        {
          name: form.nombrePelicula, 
          description: form.descripcion, 
          logoLink: `https://kscptdezabdcaceixcwg.supabase.co/storage/v1/object/public/movie-covers/${response.path}`},
      ])
      .select();

      if (error){
        alert("Ha ocurrido un error.");
      } else {
        setRefreshMovies(true);
        alert("Pelicula insertada correctamente.");
      }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      ["logo"]: e.target.files[0],
    })
  };

   const uploadFile = async (file) => {
    console.log(file);
    const { data, error } = await supabase.storage.from('movie-covers').upload(`image_${generateRandomNumber()}.jpg`, file)
    if (error) {
      console.error(error);
      return data;
    } else {
      return data;
    }
  }

  function generateRandomNumber() {
    const randomNumber = Math.random() * 1000000000000; // Multiplica por un número grande
    const roundedNumber = Math.floor(randomNumber); // Redondea hacia abajo
  
    return roundedNumber;
  }

  return (
    <>

      <h1 className='text-blue-600'>Movie Demo App</h1>
      <hr/>
      <form autoComplete='false' onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre de la pelicula</label>
        <input id='nombrePelicula' name='nombrePelicula' onChange={handleChange} placeholder='Nombre de la pelicula' />

        <label htmlFor='linkLogo'>Foto de la pelicula</label>
        <input type='file' id='linkLogo' name='linkLogo' onChange={handleFileChange} placeholder='Foto de la pelicula' />

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
