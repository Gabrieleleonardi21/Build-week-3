function Icon() {
  return (
    <>
      <div className="d-flex">
        <a
          href="#"
          className="px-3 d-flex flex-column align-items-center iconContainer"
        >
          <img src="house-door-fill.svg" alt="icona house" className="icon" />
          <p className="p-0 m-0">Home</p>
        </a>
        <a href="#" className=" px-3 d-flex flex-column align-items-center iconContainer">
          <img src="people-fill.svg" alt="la mia rete" className="icon" />
          <p className="p-0 m-0">La mia rete</p>
        </a>
        <a href="#" className="px-3 d-flex flex-column align-items-center iconContainer">
          <img src="briefcase-fill.svg" alt="messaggistica" className="icon" />
          <p className="p-0 m-0">Lavoro</p>
        </a>
        <a href="#" className="px-3 d-flex flex-column align-items-center iconContainer">
          <img
            src="chat-right-dots-fill.svg"
            alt="messaggistica"
            className="icon"
          />
          <p className="p-0 m-0">Messaggistica</p>
        </a>
        <a href="#" className="px-3 d-flex flex-column align-items-center iconContainer">
          <img src="bell-fill.svg" alt="notifica" className="icon" />
          <p className="p-0 m-0">Notifica</p>
        </a>
      </div>
    </>
  );
}

export default Icon;
