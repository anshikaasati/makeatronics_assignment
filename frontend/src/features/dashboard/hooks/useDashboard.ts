import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";

export function useDashboard() {
    const { data: events, isLoading: isEventsLoading } = useQuery({
        queryKey: ["events"],
        queryFn: api.listEvents,
        refetchInterval: 5000,
    });

    const { data: analytics } = useQuery({
        queryKey: ["analytics"],
        queryFn: api.getAnalytics,
        refetchInterval: 5000,
    });

    return {
        events,
        analytics,
        isLoading: isEventsLoading
    };
}
