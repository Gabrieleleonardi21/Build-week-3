import { useEffect, useState } from "react"
import { Card, Button, Collapse, Spinner } from "react-bootstrap"

const PAGE_SIZE = 5
const GNEWS_API_KEY = "0b3055cdb9057a6521c2ca3c6b4caa45"
const GNEWS_URL = `https://gnews.io/api/v4/top-headlines?category=general&lang=it&country=it&max=10&apikey=${GNEWS_API_KEY}`

function timeAgo(dateString) {
  const minutes = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000)
  if (minutes < 60) return `${minutes}m fa`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h fa`
  return `${Math.floor(hours / 24)} giorni fa`
}

function NewsItem({ item }) {
  return (
    <li className="mb-3">
      <p className="mb-0 fw-semibold small text-truncate">{item.title}</p>
      <span className="text-muted small">{item.meta}</span>
    </li>
  )
}

/* Divisione dell'array in 5 + 5 elementi */

function News() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(GNEWS_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          throw new Error(data.errors[0])
        }
        const articles = data.articles.map((article, index) => ({
          id: index,
          title: article.title,
          meta: `${timeAgo(article.publishedAt)} • ${article.source.name}`,
        }))
        setItems(articles)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const visibleItems = items.slice(0, PAGE_SIZE)
  const extraItems = items.slice(PAGE_SIZE)

/* Collapse di Bootstrap mostrare o nascondere gli elementi extra */

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="fs-6 fw-semibold mb-0">LinkedIn Notizie</Card.Title>
        </div>
        <div className="text-muted small mb-2">Storie principali</div>
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : error ? (
          <p className="text-danger small mb-0">{error}</p>
        ) : (
          <>
            <ul className="list-unstyled mb-0">
              {visibleItems.map((item) => (
                <NewsItem key={item.id} item={item} />
              ))}
            </ul>
            <Collapse in={open}>
              <ul className="list-unstyled mb-0">
                {extraItems.map((item) => (
                  <NewsItem key={item.id} item={item} />
                ))}
              </ul>
            </Collapse>
            {extraItems.length > 0 && (
              <Button
                variant="link"
                className="p-0 text-decoration-none small"
                onClick={() => setOpen((isOpen) => !isOpen)}
              >
                {open ? "Mostra meno" : "Mostra altro"}
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  )
}

export default News
