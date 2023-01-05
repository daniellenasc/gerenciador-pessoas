import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Badge,
  Offcanvas,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

function DetailPage() {
  //pegar o ID da URL -> desconstruir o useParams e colocar dentro das chaves o mesmo nome que foi usado como parâmetro de rota no App.js
  const { userID } = useParams();
  const navigate = useNavigate();

  //state para guardar esse id depois da requisição
  const [user, setUser] = useState([]);

  const stack = ["React", "JS", "HTML", "CSS", "NodeJS", "MongoDB", "Express"];

  const [isLoading, setIsLoading] = useState(true);

  const [reload, setReload] = useState(false); //TOGGLE para o useEffect do get, para ele rodar de novo quando houver alteração e renderizar atualizado

  //state para aparecer o formulário de edição
  const [showEdit, setShowEdit] = useState(false);

  //state para o offcanvas com a lista de tarefas concluídas
  //inicia como false pq queremos ele inicialmente fechado
  const [showTasks, setShowTasks] = useState(false);

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
        setIsLoading(false);
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

  //função assíncrona para o Card Stacks
  async function handleStack(e) {
    //console.log(e.target.checked) //-> true ou false para cada checkbox que é clicado
    //console.log(e.target.name) -> //-> para saber o nome de qual checkbox foi clicado (a tech)
    try {
      //clonar o user para deletar o id
      const clone = { ...user };
      delete clone._id;

      //adicionar a tech na array
      if (e.target.checked === true) {
        clone.stack.push(e.target.name);
      }

      //retirar a tech da array
      if (e.target.checked === false) {
        const index = clone.stack.indexOf(e.target.name);
        clone.stack.splice(index, 1);
      }

      await axios.put(
        `https://ironrest.cyclic.app/projeto02-df/${userID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  //função assíncrona para marcar tarefa como concluída
  async function handleTaskCompleta(e) {
    e.preventDefault();

    //verificação - se o input estiver vazio, não é possível marcar a tarefa como concluída
    if (!form.task) {
      toast.error("Por favor, adicione uma task!");
      return;
    }

    try {
      const clone = { ...user };
      delete clone._id;

      //dar um push na task atual para a array de tasks finalizadas
      clone.tasksFinalizadas.push(clone.task);

      //limpar os inputs
      clone.task = "";
      clone.progresso = "0";

      //atualizar a API
      await axios.put(
        `https://ironrest.cyclic.app/projeto02-df/${userID}`,
        clone
      );
      toast.success("Task marcada como concluída!");
      setReload(!reload);
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  //função para deletar uma task da lista de tasks concluídas:
  async function handleDeleteTask(index) {
    try {
      const clone = { ...user };
      delete clone._id;

      clone.tasksFinalizadas.splice(index, 1);

      await axios.put(
        `https://ironrest.cyclic.app/projeto02-df/${userID}`,
        clone
      );
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error("Erro: task não foi excluída.");
    }
  }

  console.log(form);
  //console.log(user)

  return (
    /* CARD DETALHES */
    <Container className="my-4">
      {isLoading === false && (
        <>
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

          <Row className="mt-3 ">
            {/* CARD STACK*/}
            <Col className="col-3">
              <Card bg="light">
                <Card.Header>
                  <Card.Title>Stack</Card.Title>
                </Card.Header>
                <Card.Body>
                  {stack.map((tech) => {
                    return (
                      <Form.Group className="mb-3" key={tech}>
                        <Form.Check
                          type="checkbox"
                          label={tech}
                          name={tech}
                          onChange={handleStack}
                          checked={user.stack.includes(tech)} //para deixar o checkbox marcado com a stack que está na array - PARA ISSO FAZER O ISLOADING
                        />
                      </Form.Group>
                    );
                  })}
                </Card.Body>
              </Card>
            </Col>
            {/* CARD TASKS*/}
            <Col>
              <Card bg="light">
                <Card.Header>
                  <Card.Title>Task</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Control
                      className="mb-4"
                      type="text"
                      placeholder="Insira a task que você está trabalhando"
                      name="task" //mesmo nome da chave do form
                      value={form.task} //para controlar o input
                      onChange={handleChange}
                      autoFocus //para esse inout já ficar selecionado quando o modal for aberto
                    />
                    <Form.Group className="mb-3">
                      <Form.Label>Progresso</Form.Label>
                      <Form.Range
                        min="0"
                        max="100"
                        value={form.progresso}
                        name="progresso"
                        onChange={handleChange}
                      />
                      {form.progresso}%
                    </Form.Group>
                    <Row>
                      <Col>
                        <Button
                          variant="outline-success"
                          onClick={handleSubmit}
                        >
                          Atualizar
                        </Button>
                      </Col>
                      <Col>
                        {" "}
                        <Button
                          variant="outline-success"
                          onClick={handleTaskCompleta}
                        >
                          Concluir task
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          onClick={() => setShowTasks(true)}
                        >
                          Tasks concluídas{" "}
                          <Badge bg="secondary">
                            {user.tasksFinalizadas.length}
                          </Badge>
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Offcanvas
            show={showTasks}
            onHide={() => setShowTasks(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Tasks finalizadas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup variant="flush">
                {user.tasksFinalizadas
                  .map((task, index) => {
                    return (
                      <ListGroupItem>
                        {" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteTask(index)}
                        >
                          X
                        </Button>{" "}
                        {task}
                      </ListGroupItem>
                    );
                  })
                  .reverse()}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
      {isLoading === true && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
}

export default DetailPage;
