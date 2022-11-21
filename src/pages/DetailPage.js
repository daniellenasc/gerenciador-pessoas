import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

function DetailPage() {
  //pegar o ID da URL -> desconstruir o useParams e colocar dentro das chaves o mesmo nome que foi usado como parâmetro de rota no App.js
  const { userID } = useParams();
  const navigate = useNavigate();

  //state para guardar esse id depois da requisição
  const [user, setUser] = useState([]);

  const [reload, setReload] = useState(false); //TOGGLE para o useEffect do get, para ele rodar de novo quando houver alteração e renderizar atualizado

  //state para aparecer o formulário de edição
  const [showEdit, setShowEdit] = useState(false);

  //state para editar o funcionário
  const [form, setForm] = useState({
    nome: "",
    salario: "",
    email: "",
    tel: "",
    departamento: "",
    dataAdmissao: "",
    status: "",
    stack: [],
    active: true,
    task: "",
    progresso: "",
    foto: "",
    cargo: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.cyclic.app/projeto02-df/${userID}`
        );
        setUser(response.data);
        setForm(response.data); //para que o formulário de edição já venha preenchido com os dados do funcionário
      } catch (error) {
        console.error(error);
        toast.error("Algo deu errado. Tente novamente.");
      }
    }
    fetchUser();
  }, [reload]); //reload para mostrar as alterações salvas
  //console.log(user);

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.cyclic.app/projeto02-df/${userID}`);
      navigate("/");
      toast.success("Funcionário deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado ao deletar o funcionário. Tente novamente.");
    }
  }

  function handleChange(e) {
    //if para o input checkbox
    if (e.target.name === "active") {
      //console.log("Estou no input checkbox")
      setForm({ ...form, active: e.target.checked });
      return; //para parar a função
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //a função handleSubmit é assíncrona!!
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form }; //para deletar o _id do funcionário
      delete clone._id;
      await axios.put(
        `https://ironrest.cyclic.app/projeto02-df/${userID}`,
        clone
      );

      toast.success("Alterações salvas com sucesso!");
      setReload(!reload); //TOGGLE: mudando de true p/ false e de false p/ true -> para atualizar o get com a lista de funcionários da HomePAge toda vez que um novo funcionário for cadastrado, ou seja, quando o formulário for submetido
      setShowEdit(false);
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return (
    /* CARD DETALHES */
    <Container className="my-4">
      {showEdit === false && (
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
              <Col>
                <img
                  src={user.foto}
                  alt="pequena foto de perfil do usuário"
                  height={150}
                  style={{ borderRadius: "50%" }}
                />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Row>
              <Col>
                <Button
                  variant="outline-success"
                  onClick={() => setShowEdit(true)}
                >
                  Editar funcionário
                </Button>
              </Col>
              <Col>
                <Button variant="outline-danger" onClick={handleDelete}>
                  Excluir funcionário
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      )}

      {/* CARD EDITAR */}
      {showEdit === true && (
        <Card className="text-center">
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome do funcionário:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome completo do funcionário"
                      name="nome" //mesmo nome da chave do form
                      value={form.nome} //para controlar o input
                      onChange={handleChange}
                      autoFocus //para esse inout já ficar selecionado quando o modal for aberto
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Cargo:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o cargo do funcionário"
                      name="cargo" //mesmo nome da chave do form
                      value={form.cargo} //para controlar o input
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="+xx xxxx-xxxxx"
                      name="tel" //mesmo nome da chave do form
                      value={form.tel} //para controlar o input
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="exemplo@email.com"
                      name="email" //mesmo nome da chave do form
                      value={form.email} //para controlar o input
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Salário:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="$"
                      name="salario" //mesmo nome da chave do form
                      value={form.salario} //para controlar o input
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Departamento:</Form.Label>
                    <Form.Select
                      name="departamento"
                      onChange={handleChange}
                      defaultValue={form.departamento}
                    >
                      <option>Selecione uma opção</option>
                      <option value="Front-End">Front-End</option>
                      <option value="Back-End">Back-End</option>
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Financeiro">Financeiro</option>
                      <option value="Marketing">Marketing</option>
                      <option value="People">People</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Data de admissão:</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataAdmissao" //mesmo nome da chave do form
                      value={form.dataAdmissao} //para controlar o input
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Foto:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a URL da foto do funcionário"
                      name="foto" //mesmo nome da chave do form
                      value={form.foto} //para controlar o input
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Row>
              <Col>
                <Button
                  variant="outline-danger"
                  onClick={() => setShowEdit(false)}
                >
                  Voltar
                </Button>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Funcionário ativo na empresa"
                    name="active"
                    checked={form.active}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="outline-success" onClick={handleSubmit}>
                  Salvar alterações
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}

export default DetailPage;
