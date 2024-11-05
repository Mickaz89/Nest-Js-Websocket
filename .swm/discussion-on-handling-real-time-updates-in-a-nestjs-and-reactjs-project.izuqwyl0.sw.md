---
title: Employee Attendance System with Real-Time Updates
---
# Employee Attendance System with Real-Time Updates

## Introduction

This document provides an overview of the repository `Mickaz89/Nest-Js-Websocket`, which is used for managing employee attendance with real-time data updates. The system uses NestJs for the backend and ReactJs for the frontend, incorporating Websockets for real-time communication.

## Project Description

The project is described as an Employee Attendance System. It allows management of employees and provides real-time data updates about their attendance status. The backend leverages MongoDB for data storage.

## Development Setup

To set up this project for development:

1. Clone the repository.
2. Install the dependencies.
3. Start the client and server with the provided environment variables.

For more details, you can refer to the [README file](https://github.com/Mickaz89/Nest-Js-Websocket/blob/49ffe39a8101c1097b09854a5a4e780c3da0f7ad/README.md).

## Real-Time Updates with Websockets

The system uses Websockets to handle real-time updates. Although the specific code examples were not provided in the chat, typically this involves setting up Websockets in both the server and client parts of the application. The server will push updates to the client whenever there are changes in the attendance status.

### Example Code (Hypothetical)

Below is a hypothetical example of how Websocket integration might look in the server-side code (NestJS):

<SwmSnippet path="README.md" line="1" repo-id="Z2l0aHViJTNBJTNBTmVzdC1Kcy1XZWJzb2NrZXQlM0ElM0FNaWNrYXo4OQ==" repo-name="Nest-Js-Websocket">

---

&nbsp;

```typescript
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway()
export class AttendanceGateway {
  @WebSocketServer() server;

  @SubscribeMessage('updateAttendance')
  handleAttendanceUpdate(@MessageBody() data: any): void {
    this.server.emit('attendanceUpdated', data);
  }
}
```

---

</SwmSnippet>

And in the client-side code (ReactJS):

<SwmSnippet path="README.md" line="1" repo-id="Z2l0aHViJTNBJTNBTmVzdC1Kcy1XZWJzb2NrZXQlM0ElM0FNaWNrYXo4OQ==" repo-name="Nest-Js-Websocket">

---

&nbsp;

```javascript
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000';

const AttendanceComponent = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('attendanceUpdated', data => {
      setAttendance(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Employee Attendance</h1>
      <ul>
        {attendance.map((record, index) => (
          <li key={index}>{record.name}: {record.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceComponent;
```

---

</SwmSnippet>

## Summary

This document covered the Employee Attendance System repository, highlighting its real-time update feature using Websockets. The system is built with NestJs and ReactJs and uses MongoDB for data storage. The hypothetical code examples demonstrate how Websockets might be used to handle real-time updates in both the server and client parts of the application.

<SwmMeta version="3.0.0"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
