import { useState } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard.jsx'

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Busca por nome exato; se falhar, usa lista de nomes com heurística
  const buscarPokemon = async (nome) => {
    const q = String(nome || '').trim()
    if (!q) {
      setError('Por favor, digite o nome de um Pokémon.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q.toLowerCase())}`)

      if (!response.ok) {
        const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        if (!listResponse.ok) throw new Error('Erro ao buscar lista de pokémons')

        const listData = await listResponse.json()
        const ql = q.toLowerCase()
        // primeiro matches que começam com o termo
        let matches = listData.results.filter(p => p.name.toLowerCase().startsWith(ql))
        // se nenhum, tenta includes (mais flexível)
        if (matches.length === 0) matches = listData.results.filter(p => p.name.toLowerCase().includes(ql))

        if (matches.length === 0) throw new Error('Pokémon não encontrado')

        // prioriza nomes mais longos (pikachu > pichu)
        const pokemonEncontrado = matches.sort((a, b) => b.name.length - a.name.length)[0]
        response = await fetch(pokemonEncontrado.url)
        if (!response.ok) throw new Error('Erro ao buscar dados do Pokémon')
      }

      const data = await response.json()
      setPokemon(data)
    } catch (err) {
      setError(err?.message ?? 'Erro ao buscar Pokémon')
      setPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  // Busca apenas ao submeter o formulário (melhora UX e evita spam de requisições)
  const handleSubmit = (e) => {
    e.preventDefault()
    buscarPokemon(searchTerm)
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="titulo-principal">🔍 Buscador de Pokémon</h1>
        <p className="subtitulo">Encontre seu Pokémon favorito!</p>
      </header>

      <div className="search-section">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o nome ou iniciais do Pokémon (ex: pika ou pikachu)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      {error && (
        <div className="erro-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>Carregando Pokémon...</p>
        </div>
      )}

      {pokemon && !loading && (
        <PokemonCard pokemon={pokemon} />
      )}

      {!pokemon && !loading && !error && (
        <div className="welcome-message">
          <p>👋 Bem-vindo! Digite o nome de um Pokémon para começar.</p>
        </div>
      )}
    </div>
  )
}

export default App
