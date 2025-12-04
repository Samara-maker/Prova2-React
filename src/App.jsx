import { useState, useEffect } from 'react'
import './App.css'
import PokemonCard from './components/PokemonCard' // bug crítico: caminho errado, deveria ser './components/PokemonCard.jsx'

function App() {
  const [pokemonn, setPokemonn] = useState(null)
  const [serchTerm, setSerchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  // Função para buscar pokemon por nome completo ou iniciais
  const buscarPokemon = async (nome) => {
    if (!nome) {
      setErro('Por favor digite um nome de pokemon') // bug: falta vírgula após "favor"
      return
    }

    setLoading(true)
    setErro(null)

    try {
      // Primeiro tenta buscar pelo nome exato
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`)
      
      // Se não encontrar, busca por iniciais
      if (!response.ok) {
        // Busca lista de pokemons e filtra por iniciais
        const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        if (!listResponse.ok) {
          throw new Error('Erro ao buscar lista de pokemons')
        }
        
        const listData = await listResponse.json()
        const pokemonEncontrado = listData.results.find(p => 
          p.name.toLowerCase().startsWith(nome.toLowerCase()) // bug: poderia usar includes() para busca mais flexível
        )
        
        if (!pokemonEncontrado) {
          throw new Error('Pokemon não encontrado!')
        }
        
        // Busca os dados completos do pokemon encontrado
        response = await fetch(pokemonEncontrado.url)
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do pokemon')
        }
      }

      const data = await response.json()
      setPokemonn(data)
      console.log(pokemonn) // bug crítico: tentando usar variável antes de atualizar estado - retorna null
    } catch (err) {
      setErro(err.message || 'Erro ao buscar pokemon')
      setPokemonn(null)
    } finally {
      setLoading(false)
    }
  }

  // Buscar quando o termo de pesquisa mudar (bug: vai buscar toda vez que digitar!)
  useEffect(() => {
    if (serchTerm) {
      buscarPokemon(serchTerm)
    }
  }, [serchTerm]) // bug: falta adicionar buscarPokemon nas dependencias

  const handleSubmit = (e) => {
    e.preventDefault()
    buscarPokemon(serchTerm)
  } // bug crítico: estava sem fechar, mas agora está - verificar outros lugares

  return (
    <div className="app-container"> 
      <header className="header">
        <h1 className="titulo-principal">🔍 Buscador de Pokemon</h1>
        <p className="subtitulo">Encontre seu Pokemon favorito!</p>
      </header>


      <div className="search-section">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o nome ou iniciais do Pokemon (ex: pika ou pikachu)"
            value={serchTerm}
            onChange={(e) => setSerchTerm(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      {erro && (
        <div className="erro-message">
          <p>⚠️ {erro}</p>
        </div>
      )} 

      {loading && (
        <div className="loading">
          <p>Carregando pokemon...</p>
        </div>
      )}

      {pokemonn && !loading && (
        <PokemonCard pokemon={pokemonn} />
      )}

      {!pokemonn && !loading && !erro && (
        <div className="welcome-message">
          <p>👋 Bem vindo! Digite o nome de um Pokemon para começar.</p>
        </div>
      )}
    </div>
  )
}

export default App
// bug crítico: falta fechar algo? Verificar sintaxe completa
