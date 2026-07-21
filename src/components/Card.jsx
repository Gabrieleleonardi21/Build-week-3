// Card generica in stile LinkedIn: contenitore bianco arrotondato con bordo.
// Riutilizzata da post, box "crea post", colonna profilo e notizie.
function Card({ children, className = '' }) {
  return <div className={`li-card ${className}`}>{children}</div>
}

export default Card
