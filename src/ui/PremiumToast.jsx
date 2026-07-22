import { useState, useEffect } from "react";

// Durata (ms) prima della chiusura automatica del toast
const DURATA_TOAST = 5000;

function PremiumToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleShowToast() {
      setShow(true);
    }
    window.addEventListener("showPremiumToast", handleShowToast);
    return () =>
      window.removeEventListener("showPremiumToast", handleShowToast);
  }, []);

  // Chiusura automatica dopo 5 secondi da quando il toast compare
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setShow(false), DURATA_TOAST);
    return () => clearTimeout(timer);
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="toast show position-fixed"
      style={{ bottom: "20px", right: "20px", zIndex: 9999, minWidth: "280px" }}
    >
      <div
        className="toast-header"
        style={{ backgroundColor: "#f0ad4e", color: "white" }}
      >
        <strong className="me-auto">⭐ LinkedIn Premium</strong>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => setShow(false)}
        ></button>
      </div>
      <div className="toast-body">
        Prova Premium gratis per 1 mese e sblocca funzionalità esclusive!
        <div className="mt-2">
          <button
            className="btn btn-sm btn-warning text-white"
            onClick={() => setShow(false)}
          >
            Prova ora
          </button>
        </div>
      </div>
    </div>
  );
}

export default PremiumToast;
