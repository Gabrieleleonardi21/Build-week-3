import { useState, useEffect } from 'react';

function PremiumModal() {
  const [show, setShow] = useState(true);
  const [canClose, setCanClose] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  const benefits = [
    'Vedi le offerte di lavoro per cui rientreresti fra i migliori candidati.',
    'Contatta direttamente i recruiter con i messaggi InMail',
    'Ricevi suggerimenti per la lettera di presentazione e il CV',
    'Partecipa a conversazioni live con esperti di carriera',
  ];

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 9999 }}
    >
      <div
        className="rounded-4 shadow-lg position-relative"
        style={{
          backgroundColor: '#f0ad4e',
          maxWidth: '600px',
          width: '92%',
          padding: '3rem',
        }}
      >
        {canClose ? (
          <button
            type="button"
            className="btn-close position-absolute"
            style={{ top: '20px', right: '20px' }}
            onClick={() => setShow(false)}
            aria-label="Chiudi"
          ></button>
        ) : (
          <span
            className="position-absolute d-flex align-items-center justify-content-center rounded-circle"
            style={{
              top: '20px',
              right: '20px',
              width: '28px',
              height: '28px',
              backgroundColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}
          >
            {countdown}
          </span>
        )}

        <h2 className="fw-bold text-white mb-4">
          Cerca lavoro in modo più smart
        </h2>

        <ul className="list-unstyled text-white">
          {benefits.map((text, i) => (
            <li key={i} className="d-flex align-items-start gap-2 mb-3">
              <span style={{ fontSize: '1.2rem' }}>✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <p className="text-white fw-semibold mt-4 mb-3">
          Milioni di utenti usano Premium
        </p>

        
         <a href="https://www.linkedin.com/premium/products/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-light w-100 rounded-pill fw-bold py-2 mb-3"
          style={{ fontSize: '1.1rem' }}
        >
          Prova 1 mese di Premium per 0 €
        </a>

        <p className="text-white small mb-0" style={{ opacity: 0.9 }}>
          Prova gratuita di 1 mese. Facile da annullare. Ti invieremo un promemoria 7 giorni prima della fine del periodo di prova.
        </p>
      </div>
    </div>
  );
}

export default PremiumModal;