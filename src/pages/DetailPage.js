import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

function DetailPage() {
  //pegar o ID da URL -> desconstruir o useParams e colocar dentro das chaves o mesmo nome que foi usado como parâmetro de rota no App.js
  const { userID } = useParams();
  const navigate = useNavigate();

  //state para guardar esse id depois da requisição
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/projeto02-92/${userID}`
        );
        setUser(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Algo deu errado. Tente novamente.");
      }
    }
    fetchUser();
  }, []);
  //console.log(user);

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/projeto02-92/${userID}`);
      navigate("/");
      toast.success("Funcionário deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado ao deletar o funcionário. Tente novamente.");
    }
  }

  return (
    <Container className="my-4">
      <Card className="text-center">
        <Card.Header>
          <Card.Title>{user.nome}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Data de Admissão: {user.dataAdmissao}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>E-mail</Card.Title>
              <Card.Text>{user.email}</Card.Text>

              <Card.Title>Departamento</Card.Title>
              <Card.Text>{user.departamento}</Card.Text>

              <Card.Title>Status</Card.Title>
              <Card.Text>{user.status}</Card.Text>
            </Col>

            <Col>
              <Card.Title>Telefone</Card.Title>
              <Card.Text>{user.tel}</Card.Text>

              <Card.Title>Cargo</Card.Title>
              <Card.Text>{user.cargo}</Card.Text>

              <Card.Text>
                {user.active ? "Ativo na empresa" : "Inativo na empresa"}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Row>
            <Col>
              <Button variant="outline-success">Editar funcionário</Button>
            </Col>
            <Col>
              <Button variant="outline-danger" onClick={handleDelete}>
                Excluir funcionário
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default DetailPage;
