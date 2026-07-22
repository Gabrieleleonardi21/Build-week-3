import { Card } from "react-bootstrap";
import { puzzles } from "@/lib/DatiTemporanei";

function Puzzle({ items = puzzles }) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="fs-6 fw-semibold mb-3">
          I rompicapo di oggi
        </Card.Title>
        <ul className="list-unstyled mb-0">
          {items.map((puzzle) => (
            <li
              key={puzzle.id}
              className="d-flex align-items-center gap-2 mb-3"
            >
              <div className="puzzle-icon" style={{ background: puzzle.color }}>
                {puzzle.name.charAt(0)}
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-semibold small">
                  {puzzle.name} #{puzzle.number}
                </p>
                <span className="text-muted small">{puzzle.stat}</span>
              </div>
              <span className="puzzle-chevron" aria-hidden="true">
                ›
              </span>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}

export default Puzzle;
