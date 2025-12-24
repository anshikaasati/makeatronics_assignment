import axios from "axios";

// In production, use env var
const API_BASE = "http://localhost:8000/api/v1";

export interface Event {
    id: string;
    raw_content: string;
    domain: string;
    severity: "INFO" | "WARNING" | "CRITICAL" | "UNKNOWN";
    category: "ISSUE" | "INCIDENT" | "EVENT" | "LOG" | "TASK" | "NOTE" | "UNKNOWN";
    tags: string[];
    created_at: string;
}

export const api = {
    ingest: async (text: string) => {
        const res = await axios.post<Event>(`${API_BASE}/ingest`, { raw_content: text });
        return res.data;
    },
    listEvents: async () => {
        const res = await axios.get<Event[]>(`${API_BASE}/events`);
        return res.data;
    },
    getAnalytics: async () => {
        const res = await axios.get(`${API_BASE}/analytics/summary`);
        return res.data;
    }
};
