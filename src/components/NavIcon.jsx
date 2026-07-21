import { useNavAttiva } from "../navAttiva";

// Voce di navigazione condivisa tra header, menu a tendina e footer:
// quella attiva prende il border-bottom nero.
function NavIcon({ id, src, alt, testo, classeTesto = "p-0 m-0" }) {
  const { attiva, setAttiva } = useNavAttiva();

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setAttiva(id);
      }}
      className={
        "px-2 px-lg-3 d-flex flex-column align-items-center iconContainer" +
        (attiva === id ? " iconAttiva" : "")
      }
    >
      <img src={src} alt={alt} className="icon" />
      <p className={classeTesto}>{testo}</p>
    </a>
  );
}

export default NavIcon;
