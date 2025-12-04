import './PokemonCard.css' // bug crítico: caminho pode estar errado dependendo da configuração
import './PokemonCard.cssx' // bug crítico: arquivo que não existe! - vai quebrar o import

function PokemonCard({ pokemon }) {
  if (!pokemon) {
    return null
  }

  const tipos = pokemon.types.map(tipo => tipo.type.name) // bug crítico: se types for undefined, quebra tudo
  const habilidades = pokemon.abilities.map(ab => ab.ability.name) // bug crítico: se abilities for undefined, quebra tudo
  const peso = pokemon.weight / 10 // bug crítico: se weight não existir, retorna NaN

  return (
    <div className="pokemon-card"> {/* bug crítico: JSX pode quebrar se houver erro de sintaxe acima */
      <div className="pokemon-header">
        <h2 className="pokemon-nome">{pokemon.name}</h2>
        <span className="pokemon-id">#{pokemon.id}</span>
      </div>

      <div className="pokemon-imagem-container">
        <img
          src={pokemon.sprites.front_default}
          alt={`Imagem do ${pokemon.name}`}
          className="pokemon-imagem"
          onError={(e) => { e.target.style.display = 'none' }} // bug: deveria ter uma imagem de fallback
        />
      </div>

      <div className="pokemon-info">
        <div className="info-section">
          <h3>Tipos</h3>
          <div className="tipos-container">
            {tipos.map((tipo, index) => (
              <span key={index} className={`tipo-badge tipo-${tipo}`}>
                {tipo}
              </span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Estatísticas</h3>
          <div className="stats-container">
            {pokemon.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-name">{stat.stat.name}:</span>
                <span className="stat-value">{stat.base_stat}</span>
                {/* bug: usando index como key, deveria usar algo único */}
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Habilidades</h3>
          <div className="habilidades-container">
            {habilidades.map((habilidade, index) => (
              <span key={index} className="habilidade-badge">
                {habilidade}
              </span>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h3>Peso e Altura</h3>
          <div className="peso-altura">
            <p>Peso: {pokemon.weight / 10} kg</p>
            <p>Altura: {pokemon.height / 10} m</p>
            {/* bug engraçado: pokemon muito pesado! peso deveria ser dividido por 10 */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
// bug crítico: verificar se todos os imports estão corretos

