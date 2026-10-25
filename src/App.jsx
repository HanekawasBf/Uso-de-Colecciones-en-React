import { useState } from "react";

function App() {
  // Estado de la lista y del buscador
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");

  // Estado de cada campo del formulario
  const [customerName, setCustomerName] = useState("");
  const [guests, setGuests] = useState("");
  const [time, setTime] = useState("");
  const [tableType, setTableType] = useState("Indoor");

  // Agregar reservación
  const addReservation = () => {
    const newReservation = {
      id: Date.now(),
      customerName,
      guests,
      time,
      tableType,
    };

    setReservations([...reservations, newReservation]);

    // Limpiar el formulario
    setCustomerName("");
    setGuests("");
    setTime("");
    setTableType("Indoor");
  };

  // Eliminar reservación
  const deleteReservation = (id) => {
    const updatedReservations = reservations.filter(
      (reservation) => reservation.id !== id
    );
    setReservations(updatedReservations);
  };

  // Buscar por nombre (sin importar mayúsculas o minúsculas)
  const filteredReservations = reservations.filter((reservation) =>
    reservation.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h1>Restaurant Reservation Manager</h1>

      {/* Formulario */}
      <h2>New Reservation</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Number of Guests"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />

      <input
        type="text"
        placeholder="Reservation Time (ej. 7:00 PM)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <select
        value={tableType}
        onChange={(e) => setTableType(e.target.value)}
      >
        <option value="Indoor">Indoor</option>
        <option value="Outdoor">Outdoor</option>
        <option value="VIP">VIP</option>
        <option value="Family Area">Family Area</option>
      </select>

      <button onClick={addReservation}>Add Reservation</button>

      {/* Buscador */}
      <h2>Reservations</h2>

      <input
        type="text"
        placeholder="Search by customer name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Total */}
      <p>Total reservations: {reservations.length}</p>

      {/* Extra opción 2: no hay reservaciones */}
      {reservations.length === 0 && <p>No reservations yet.</p>}

      {/* Extra opción 3: la búsqueda no encontró nada */}
      {reservations.length > 0 && filteredReservations.length === 0 && (
        <p>No reservations found.</p>
      )}

      {/* Lista de tarjetas */}
      {filteredReservations.map((reservation) => (
        <div
          key={reservation.id}
          style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}
        >
          <h3>{reservation.customerName}</h3>
          <p>Guests: {reservation.guests}</p>
          <p>Time: {reservation.time}</p>
          <p>Table: {reservation.tableType}</p>
          <button onClick={() => deleteReservation(reservation.id)}>
            Cancel Reservation
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;