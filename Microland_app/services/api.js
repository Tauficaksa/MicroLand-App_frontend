const BASE_URL = "http://YOUR_LOCAL_IP:5000/api";
const USER_ID = 1;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) {
    throw new Error("API request failed");
  }
  return res.json();
}

export const api = {
  sendMessage: (message) =>
    request("/chat", { method: "POST", body: JSON.stringify({ userId: USER_ID, message }) }),
  getMessages: () => request(`/chat/${USER_ID}`),
  getAppointments: () => request(`/appointments/${USER_ID}`),
  addAppointment: (payload) =>
    request("/appointments", { method: "POST", body: JSON.stringify({ userId: USER_ID, ...payload }) }),
  getMedications: () => request(`/medications/${USER_ID}`),
  addMedication: (payload) =>
    request("/medications", { method: "POST", body: JSON.stringify({ userId: USER_ID, ...payload }) }),
  getHistory: () => request(`/history/${USER_ID}`),
  getInsights: () => request(`/insights/${USER_ID}`)
};
