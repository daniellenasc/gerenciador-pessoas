import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function ModalCreateUser({ reload, setReload }) {
  const [show, setShow] = useState(false);
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
    progresso: "0",
    foto: "",
    cargo: "",
    tasksFinalizadas: [],
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //console.log(form);

  //a função handleSubmit é assíncrona!!
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.post("https://ironrest.cyclic.app/projeto02-df", form);
      handleClose(); //fechar o modal
      //limpar o formulário:
      setForm({
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
        tasksFinalizadas: [],
      });
      toast.success("Novo funcionário cadastrado com sucesso!");
      setReload(!reload); //TOGGLE: mudando de true p/ false e de false p/ true -> para atualizar o get com a lista de funcionários da HomePAge toda vez que um novo funcionário for cadastrado, ou seja, quando o formulário for submetido
    } catch (error) {
      console.error(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        + Cadastrar novo funcionário
      </Button>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Formulário para novo funcionário</Modal.Title>
        </Modal.Header>

        {/* FORMULÁRIO -> 5 ROWS + 2 COLS */}
        <Modal.Body>
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
                  <Form.Select name="departamento" onChange={handleChange}>
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
                  <Form.Label>Status:</Form.Label>
                  <Form.Select name="status" onChange={handleChange}>
                    <option>Selecione uma opção</option>
                    <option value="Disponível">Disponível</option>
                    <option value="Alocado">Alocado</option>
                    <option value="De Férias">De Férias</option>
                    <option value="De Licença">De Licença</option>
                  </Form.Select>
                </Form.Group>
              </Col>
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
            </Row>

            <Row>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateUser;
