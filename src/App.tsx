import { useAppDispatch, useAppSelector } from './store/hooks';
import { addToFavorites, removeFromFavorites } from './store/slices/favoritesSlice';
import type { Movie } from './store/slices/favoritesSlice';

function App() {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(state => state.favorites.favoriteMovies);

  const exampleMovie: Movie = {
    id: 1,
    title: "Exemplo de Filme",
    poster_path: "/example.jpg"
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(exampleMovie));
  };

  const handleRemoveFromFavorites = (movieId: number) => {
    dispatch(removeFromFavorites(movieId));
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center p-4">
        MovieDash
      </h1>
      
      {}
      <div className="p-4">
        <h2 className="text-xl mb-4">Favoritos ({favoriteMovies.length})</h2>
        
        <button 
          onClick={handleAddToFavorites}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mr-2"
        >
          Adicionar Filme Exemplo
        </button>

        <div className="mt-4">
          {favoriteMovies.map(movie => (
            <div key={movie.id} className="bg-slate-800 p-3 rounded mb-2 flex justify-between items-center">
              <span>{movie.title}</span>
              <button 
                onClick={() => handleRemoveFromFavorites(movie.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App