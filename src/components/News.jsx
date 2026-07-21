import { useState } from "react"
import { Card, Button, Collapse } from "react-bootstrap"
import { newsItems } from "./DatiTemporanei"

const PAGE_SIZE = 5

function NewsItem({ item }) {
  return (
    <li className="mb-3">
      <p className="mb-0 fw-semibold small">{item.title}</p>
      <span className="text-muted small">{item.meta}</span>
    </li>
  )
}

/* Divisione dell'array in 5 + 5 elementi */

function News({ items = newsItems }) {
  const [open, setOpen] = useState(false)
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
      </Card.Body>
    </Card>
  )
}

export default News
