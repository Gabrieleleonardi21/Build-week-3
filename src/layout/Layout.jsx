import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "@/layout/Header";
import FooterNav from "@/layout/FooterNav";
import NotificheToast from "@/features/notifications/NotificheToast";

// Struttura comune alle pagine dell'app: header sticky in alto, contenuto
// della rotta al centro (Outlet) e footer nav su mobile. Le rotte figlie
// vengono renderizzate dentro il Container, cosi' header e footer restano
// montati mentre si naviga tra le sezioni.
function Layout() {
  return (
    <>
      <Header />
      <Container className="mt-3">
        <Outlet />
      </Container>
      <FooterNav />
      {/* toast delle notifiche: stesso contenuto mostrato nel dropdown */}
      <NotificheToast />
    </>
  );
}

export default Layout;
