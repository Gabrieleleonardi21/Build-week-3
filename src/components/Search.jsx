import { useRef } from "react";

// Fino a md la ricerca e' solo una lente: al click compare il campo.
// Da md in su il campo e' sempre visibile.
// Lo stato arriva dall'Header perche' all'apertura il logo deve sparire.
function Search({ aperta, onToggle }) {
  const campo = useRef(null);

  const toggle = () => {
    onToggle(!aperta);
    if (!aperta) {
      // il campo esce dal display:none solo dopo il render
      setTimeout(() => campo.current?.focus(), 0);
    }
  };

  return (
    <div className="d-flex align-items-center flex-grow-1 minWidth0">
      <button
        type="button"
        onClick={toggle}
        aria-label="Cerca"
        aria-expanded={aperta}
        className="searchToggle d-md-none border-0 bg-transparent px-2 flex-shrink-0"
      >
        <i className={aperta ? "bi bi-x-lg" : "bi bi-search"}></i>
      </button>

      <input
        ref={campo}
        type="text"
        name="search"
        id="search"
        placeholder="Cerca"
        className={aperta ? "searchAperto" : ""}
      />
    </div>
  );
}

export default Search;
