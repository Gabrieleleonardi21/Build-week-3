function Sidebar() {
  return (
    <div className="sidebar-fixed d-flex flex-column gap-2">
      {/* CARD 1: Profilo */}
      <div className="card border-0 shadow-sm">
        <div
          style={{
            height: '54px',
            background: 'linear-gradient(90deg, #6e8fae 60%, #9fb8cf 60%)',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        ></div>

        <div className="px-3">
          <img
            src="https://ui-avatars.com/api/?name=Nicole+Paulino&background=6c8faf&color=fff"
            alt="Avatar utente"
            className="rounded-circle border border-white border-3"
            style={{ width: '64px', height: '64px', marginTop: '-32px' }}
          />
        </div>

        <div className="px-3 pt-2 pb-3">
          <h6 className="mb-0 fw-bold" style={{ fontSize: '1.05rem' }}>
            Nicole Paulino
          </h6>
          <p className="small text-muted mb-1">--</p>
          <p className="small text-muted mb-3">Roma, Lazio</p>
          <button className="btn btn-outline-secondary btn-sm rounded-pill">
            + Esperienza
          </button>
        </div>
      </div>

      {/* CARD 2: Promo Premium */}
      <div className="card border-0 shadow-sm p-3">
        <p className="small mb-2" style={{ color: '#5e5e5e' }}>
          Sblocca strumenti Premium e dai una spinta alla tua carriera
        </p>
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: '1.1rem' }}>🏅</span>
          <a href="#" className="small fw-semibold text-decoration-none" style={{ color: '#0a66c2' }}>
            Prova 1 mese per 0 €
          </a>
        </div>
      </div>

      {/* CARD 3: Collegamenti */}
      <div className="card border-0 shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0 fw-semibold small">Collegamenti</p>
            <p className="mb-0 small text-muted">Amplia la tua rete</p>
          </div>
          <span className="fw-bold" style={{ color: '#0a66c2' }}>0</span>
        </div>
      </div>

      {/* CARD 4: Menu */}
      <div className="card border-0 shadow-sm p-2">
        <a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2">
          🔖 <span className="small">Elementi salvati</span>
        </a>
        <a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2">
          👥 <span className="small">Gruppi</span>
        </a>
        <a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2">
          📰 <span className="small">Newsletter</span>
        </a>
        <a href="#" className="d-flex align-items-center gap-2 text-dark text-decoration-none py-2 px-2">
          📅 <span className="small">Eventi</span>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;