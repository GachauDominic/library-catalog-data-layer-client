import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function SpaceBookingPage() {
  const [spaces, setSpaces] = useState([]);
  const [spaceId, setSpaceId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/spaces`)
      .then((response) => response.ok ? response.json() : [])
      .then((data) => setSpaces(Array.isArray(data) ? data : []))
      .catch(() => setSpaces([]));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    if (endTime <= startTime) {
      setStatus("End time must be after start time.");
      return;
    }
    try {
      const token = window.localStorage.getItem("token");
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ spaceId, date, startTime, endTime }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Booking failed");
      setStatus("Space booked successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Booking failed");
    }
  }

  return (
    <section className="mx-auto max-w-[560px] py-[70px]">
      <h1 className="font-serif text-[44px]">Book a space.</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label>
          Space
          <select required value={spaceId} onChange={(event) => setSpaceId(event.target.value)}>
            <option value="">Select a space</option>
            {spaces.map((space) => <option key={space.id} value={space.id}>{space.name}</option>)}
          </select>
        </label>
        <label>Date<input type="date" required value={date} onChange={(event) => setDate(event.target.value)} /></label>
        <label>Start time<input type="time" required value={startTime} onChange={(event) => setStartTime(event.target.value)} /></label>
        <label>End time<input type="time" required value={endTime} onChange={(event) => setEndTime(event.target.value)} /></label>
        {status && <p role="status">{status}</p>}
        <button type="submit">Book space</button>
      </form>
    </section>
  );
}
