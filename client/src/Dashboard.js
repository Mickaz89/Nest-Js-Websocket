import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Moment from 'moment';
import { Table } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const socket = io("ws://localhost:3001");

export default function Dashboard({ direction, ...args }) {
  
  const [username, setUsername] = useState(null);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    // Listen to socket
    socket.on("events", (message) => {
      setEvent(message);
    });
    setEvent(null);

    // Retrieve username from localstorage
    const username = localStorage.getItem("username");
    setUsername(username);

    // Retrieve current user status
    const fetchUserStatus = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${username}`);
      const data = await response.json();
      setStatus(data.status);
    };

    // Retrieve users
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/user`);
      const data = await response.json();
      setUsers(data);
    };

    fetchUserStatus();
    fetchUsers();

    return () => {
      // prevent multiple event registrations
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [event]);

  const updateStatus = async (status) => {
    setStatus(status);
    await fetch(`${process.env.REACT_APP_SERVER_URL}/user/${username}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1>Hello {username}</h1>
      </div>
      <div className="mb-3 d-flex">
        <h3 className="me-3">
          Current status :
        </h3>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
          <DropdownToggle caret>{status ? status : "Select"}</DropdownToggle>
          <DropdownMenu {...args}>
            <DropdownItem onClick={(e) => updateStatus(e.target.innerText)}>
              working
            </DropdownItem>
            <DropdownItem onClick={(e) => updateStatus(e.target.innerText)}>
              vacation
            </DropdownItem>
            <DropdownItem onClick={(e) => updateStatus(e.target.innerText)}>
              sickness
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>{Moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
