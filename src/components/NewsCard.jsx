import Card from './Card'

// Colonna destra della home: elenco statico "LinkedIn Notizie".
const NEWS = [
  'La Spagna vince il Mondiale 2026',
  'Al via l’offerta di Poste su Tim',
  'Geopop sbarca in tv',
  'Uber ha comprato Glovo',
  'Alla radice del fenomeno dei Neet',
]

function NewsCard() {
  return (
    <Card className="p-3">
      <h6 className="fw-bold mb-2">LinkedIn Notizie</h6>
      <ul className="news-list">
        {NEWS.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </Card>
  )
}

export default NewsCard
