import { Container, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://ironrest.cyclic.app/projeto02-92"
        );
        //console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);
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
      </Container>
    </div>
  );
}

export default HomePage;
