import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './modules/home/Pages/HomePage';

function App() {
  return (
    <Router>
      <div className="bg-slate-900 text-white min-h-screen">
        <header className="p-4 bg-slate-800">
          <h1 className="text-3xl font-bold text-center">
            MovieDash
          </h1>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            { }
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;