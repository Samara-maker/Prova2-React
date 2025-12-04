import './PokemonCard.css'

function PokemonCard({ pokemon }) {
  if (!pokemon) return null

  const tipos = (pokemon?.types ?? []).map(t => t?.type?.name).filter(Boolean)
  const habilidades = (pokemon?.abilities ?? []).map(a => a?.ability?.name).filter(Boolean)
  const stats = pokemon?.stats ?? []
  const peso = typeof pokemon?.weight === 'number' ? (pokemon.weight / 10) : null
  const altura = typeof pokemon?.height === 'number' ? (pokemon.height / 10) : null
  const placeholder = 'https://via.placeholder.com/200?text=Sem+imagem'

  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <h2 className="pokemon-nome">{pokemon?.name}</h2>
        <span className="pokemon-id">#{pokemon?.id}</span>
      </div>

      <div className="pokemon-imagem-container">
        <img
          src={pokemon?.sprites?.front_default || placeholder}
          alt={`Imagem do ${pokemon?.name ?? 'Pokémon'}`}
          className="pokemon-imagem"
          onError={(e) => { e.currentTarget.src = placeholder }}
        />
      </div>

      <div className="pokemon-info">
        <div className="info-section">
          <h3>Tipos</h3>
          <div className="tipos-container">
            {tipos.map(tipo => (
              <span key={tipo} className={`tipo-badge tipo-${tipo}`}>
                {tipo}
              </span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Estatísticas</h3>
          <div className="stats-container">
            {stats.map(stat => (
              <div key={stat?.stat?.name} className="stat-item">
                <span className="stat-name">{stat?.stat?.name}:</span>
                <span className="stat-value">{stat?.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Habilidades</h3>
          <div className="habilidades-container">
            {habilidades.map(h => (
              <span key={h} className="habilidade-badge">{h}</span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Peso e Altura</h3>
          <div className="peso-altura">
            <p>Peso: {peso !== null ? `${peso} kg` : '-'}</p>
            <p>Altura: {altura !== null ? `${altura} m` : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
