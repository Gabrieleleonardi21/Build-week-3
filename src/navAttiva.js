import { createContext, useContext } from "react";

// Header e FooterNav mostrano le stesse voci: quale sia quella attiva sta in
// un context cosi' i due restano allineati senza passare props in mezzo.
export const NavAttivaContext = createContext(null);

export function useNavAttiva() {
  return useContext(NavAttivaContext);
}
