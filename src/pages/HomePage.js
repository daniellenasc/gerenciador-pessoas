import {
  Container,
  Table,
  Button,
  ProgressBar,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import ModalCreateUser from "../components/ModalCreateUser";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false); //para quando o modal fechar, depois de cadastrar um novo funcionário, o useEffect rode novamente e atualize a lista de funcionários. Ele vai ficar na array de dependências do useEffect para que, toda vez que ele mudar, o useEffect rode novamente! Assim, vai ser passado como props para o componente setModal, para que seu valor atualize (true/false) quando um novo funcionário for cadastrado, ou seja, na função handleSubmit. Dessa forma, não será necessário dar F5 na página para ver a lista de funcionários atualizada.

  //state para a searchbar
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://ironrest.cyclic.app/projeto02-df"
        );
        //console.log(response.data);
        setUsers(response.data);
        //console.log("Dentro do useEffect da Home")
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  //console.log(users);
  console.log(search);

  return (
    <div>
      <h1 className="my-3">Dashboard</h1>

      <Container>
        {/* SEARCH BAR */}
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise por nome, departamento ou cargo"
          className="my-3"
        >
          <Form.Control
            type="text"
            placeholder="pesquise"
            value={search}
            onChange={handleSearch}
          />
        </FloatingLabel>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Task</th>
              <th>Progresso</th>
              <th>Status</th>
              <th>Departamento</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              //a searchbar é o .filter() antes do .map()
              .filter((user) => {
                return (
                  user.nome.toLowerCase().includes(search.toLowerCase()) ||
                  user.departamento
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  user.cargo.toLowerCase().includes(search.toLowerCase())
                );
              })

              .map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.nome}</td>
                    <td>{user.task}</td>
                    <td>
                      <ProgressBar
                        animated
                        now={user.progresso}
                        label={`${user.progresso}%`}
                      />
                    </td>
                    <td>{user.status}</td>
                    <td>{user.departamento}</td>
                    <td>
                      {" "}
                      <Link to={`/user/${user._id}`}>
                        <Button variant="outline-secondary" size="sm">
                          Detalhes
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <ModalCreateUser reload={reload} setReload={setReload} />
      </Container>
    </div>
  );
}

export default HomePage;
