
function NotificaItem({ notifica }) {
  return (
    <div className="notificaItem d-flex gap-2">
      <img
        src={notifica.avatar}
        alt={notifica.autore}
        className="rounded-circle notificaItem-avatar"
      />
      <div className="notificaItem-corpo">
        <p className="notificaItem-testo m-0">
          <span className="notificaItem-autore">{notifica.autore}</span>{" "}
          {notifica.testo}
        </p>
        <p className="notificaItem-tempo m-0">{notifica.tempo}</p>
      </div>
    </div>
  );
}

export default NotificaItem;
