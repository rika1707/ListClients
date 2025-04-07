# 🌐 ClientsApp (Angular Frontend)

**ClientsApp** is a modern Angular web application built for managing client data through a fully functional CRUD interface.  
It integrates a dynamic UI, geolocation mapping, and Excel export capabilities.

---

## 🛠️ Technologies Used

- **Angular**: Web framework for creating single-page applications.
- **Tailwind CSS**: Utility-first CSS framework used for styling the UI.
- **Angular Material**: Used for building fast, accessible UI components.
- **Leaflet.js**: Interactive maps integration.
- **OpenStreetMap (Nominatim API)**: Used to fetch geolocation coordinates based on client addresses.
- **xlsx**: For exporting client data into Excel format.

---

## 📦 Features

- ✅ Full **CRUD** (Create, Read, Update, Delete) operations for clients.
- 📍 Geolocation integration using Leaflet + OpenStreetMap.
- 📊 Export data to **Excel** with one click.
- 🎨 Responsive and elegant UI with **Tailwind CSS** and **Angular Material** components.

---

## 🔌 External Services

- [OpenStreetMap Nominatim API](https://nominatim.openstreetmap.org/):  
  Used to convert client addresses to latitude and longitude coordinates.
  
  ---

## ▶️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Angular CLI](https://angular.io/cli)
- A modern code editor (VS Code recommended)

### Install and Run

```bash
git clone https://github.com/rika1707/ListClients.git
cd ListClients/ClientsApp
npm install
ng serve
