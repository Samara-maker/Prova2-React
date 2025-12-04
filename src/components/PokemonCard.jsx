import './PokemonCard.css' 

function PokemonCard({ pokemon }) {

  if (!pokemon) {
    return null
  }

  const tipos = pokemon.types?.map(tipo => tipo.type.name) || []

  const habilidades = pokemon.abilities?.map(ab => ab.ability.name) || []

  const peso = pokemon.weight ? pokemon.weight / 10 : 0

  return (
    <div className="pokemon-card">

      <div className="pokemon-header">
        <h2 className="pokemon-nome">{pokemon.name}</h2>
        <span className="pokemon-id">#{pokemon.id}</span>
      </div>

      <div className="pokemon-imagem-container">
        <img
          src={pokemon.sprites?.front_default}
          alt={`Imagem do ${pokemon.name}`}
          className="pokemon-imagem"
          onError={(e) => { 
            e.target.src = '/fallback-pokemon.png' 
          }}
        />
      </div>

      <div className="pokemon-info">

        <div className="info-section">
          <h3>Tipos</h3>
          <div className="tipos-container">
            {tipos.map((tipo, index) => (
              <span key={tipo + index} className={`tipo-badge tipo-${tipo}`}>
                {tipo}
              </span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Estatísticas</h3>
          <div className="stats-container">
            {pokemon.stats?.map((stat) => (
              <div key={stat.stat.name} className="stat-item">
                <span className="stat-name">{stat.stat.name}:</span>
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            )) || null}
          </div>
        </div>

        <div className="info-section">
          <h3>Habilidades</h3>
          <div className="habilidades-container">
            {habilidades.map((habilidade, index) => (
              <span key={habilidade + index} className="habilidade-badge">
                {habilidade}
              </span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Peso e Altura</h3>
          <div className="peso-altura">
            <p>Peso: {peso} kg</p>
            <p>Altura: {pokemon.height ? pokemon.height / 10 : 0} m</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PokemonCard;
