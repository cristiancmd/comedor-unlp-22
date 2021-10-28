import  {useState} from "react"
import Elegir_tickets from "../elegir_tickets/elegir_tickets"
import Pagar_tickets from "../pagar_tickets/pagar_tickets"

const Comprar_tickets = () => {

  const [termine_de_elegir, set_termine_de_elegir] = useState(false);
  const [mis_tickets, set_mis_tickets] = useState([]);

  return (
    <>
      {
        termine_de_elegir?
        <Pagar_tickets mis_tickets={mis_tickets} set_mis_tickets={set_mis_tickets}></Pagar_tickets>:
        <Elegir_tickets set_termine_de_elegir={set_termine_de_elegir} set_mis_tickets={set_mis_tickets}></Elegir_tickets>
      }
    </>
  )
}

export default Comprar_tickets