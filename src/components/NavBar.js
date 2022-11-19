import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand as="div">
            {" "}
            {/* dentro da Navbar.Brand existe uma tag 'a', o que faz com que a aplicação vai ser completamente atualizada novamente, assim temos que utilizar o as="div", ou seja, para que o componente seja criado como uma div, e então envolve-lo com um Link */}
            <img
              alt="logo da ironhack em cinza escuro e branco"
              src="https://avatars.githubusercontent.com/u/4854004?s=280&v=4"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Ironhack - Gerenciador de Pessoas
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}
export default NavBar;
