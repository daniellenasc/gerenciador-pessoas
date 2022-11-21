import { Container, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import ModalCreateUser from "../components/ModalCreateUser";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false); //para quando o modal fechar, depois de cadastrar um novo funcionário, o useEffect rode novamente e atualize a lista de funcionários. Ele vai ficar na array de dependências do useEffect para que, toda vez que ele mudar, o useEffect rode novamente! Assim, vai ser passado como props para o componente setModal, para que seu valor atualize (true/false) quando um novo funcionário for cadastrado, ou seja, na função handleSubmit. Dessa forma, não será necessário dar F5 na página para ver a lista de funcionários atualizada.

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
  //console.log(users);

  return (
    <div>
      <h1>HOME PAGE</h1>

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Task</th>
              <th>%</th>
              <th>Status</th>
              <th>Departamento</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.nome}</td>
                  <td>{user.task}</td>
                  <td>{user.progresso}</td>
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
