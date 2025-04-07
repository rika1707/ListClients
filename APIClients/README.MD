# 🧠 ListClients Backend API

This is the backend service for the **ListClients** project, built with **.NET 8 (ASP.NET Core Web API)**.  
It handles all client-related operations such as creating, retrieving, updating, and deleting client records.

---

## ⚙️ Technologies Used

- **.NET 8 (ASP.NET Core Web API)**: Modern and efficient web framework for RESTful APIs.
- **Entity Framework Core**: For interacting with the database using LINQ.
- **ClosedXML**: Library used to generate Excel and PDF-like files from data.

---

## 🔌 API Endpoints

Base URL: `http://localhost:5127/api/clients/`

| Method | Endpoint                        | Description                   |
|--------|----------------------------------|-------------------------------|
| GET    | `/`                              | Get all clients               |
| GET    | `/{id}`                          | Get a single client by ID     |
| POST   | `/`                              | Create a new client           |
| PUT    | `/{id}`                          | Update an existing client     |
| DELETE | `/{id}`                          | Delete a client by ID         |
| GET    | `/download-excel`                | Get Excel of Clients          |

### Example:

```bash
GET http://localhost:5127/api/clients/
