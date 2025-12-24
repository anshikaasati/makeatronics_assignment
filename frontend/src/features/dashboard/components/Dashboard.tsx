import { AlertTriangle, Info, Activity } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import { StatCard } from "./StatCard";
import { EventItem } from "./EventItem";

export function Dashboard() {
    const { events, analytics, isLoading } = useDashboard();

    if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading intelligence...</div>;

    return (
        <div className="space-y-8">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Critical Events"
                    count={analytics?.severity_distribution?.CRITICAL || 0}
                    icon={<AlertTriangle className="text-destructive" />}
                    color="text-destructive"
                />
                <StatCard
                    title="Warnings"
                    count={analytics?.severity_distribution?.WARNING || 0}
                    icon={<Activity className="text-yellow-500" />}
                    color="text-yellow-500"
                />
                <StatCard
                    title="Info Logs"
                    count={analytics?.severity_distribution?.INFO || 0}
                    icon={<Info className="text-blue-500" />}
                    color="text-blue-500"
                />
            </div>

            {/* Event Feed */}
            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Live Intelligence Feed
                    </h3>
                </div>
                <div className="divide-y max-h-[600px] overflow-y-auto">
                    {events?.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">No events recorded. Start typing above!</div>
                    ) : (
                        events?.map((event: any) => (
                            <EventItem key={event.id} event={event} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
