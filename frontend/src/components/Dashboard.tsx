import { useQuery } from "@tanstack/react-query";
import { api, type Event } from "../lib/api";
import { AlertTriangle, CheckCircle, Info, Activity } from "lucide-react";
import { cn } from "../lib/utils";

export function Dashboard() {
    const { data: events, isLoading } = useQuery({
        queryKey: ["events"],
        queryFn: api.listEvents,
        refetchInterval: 5000,
    });

    const { data: analytics } = useQuery({
        queryKey: ["analytics"],
        queryFn: api.getAnalytics,
        refetchInterval: 5000,
    });

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
                        events?.map((event: Event) => (
                            <EventItem key={event.id} event={event} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, count, icon, color }: { title: string, count: number, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-card p-6 rounded-xl border shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <p className={cn("text-3xl font-bold mt-2", color)}>{count}</p>
            </div>
            <div className="p-3 bg-muted rounded-full">
                {icon}
            </div>
        </div>
    );
}

function EventItem({ event }: { event: Event }) {
    const severityColor = {
        CRITICAL: "border-l-destructive bg-destructive/5",
        WARNING: "border-l-yellow-500 bg-yellow-500/5",
        INFO: "border-l-blue-500 bg-blue-500/5",
        UNKNOWN: "border-l-gray-300",
    }[event.severity];

    return (
        <div className={cn("p-4 border-l-4 hover:bg-muted/50 transition-colors", severityColor)}>
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border",
                        event.severity === "CRITICAL" ? "text-destructive border-destructive/20" :
                            event.severity === "WARNING" ? "text-yellow-600 border-yellow-500/20" :
                                "text-blue-600 border-blue-500/20"
                    )}>
                        {event.severity}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {event.domain}
                    </span>
                </div>
                <span className="text-xs text-muted-foreground">
                    {new Date(event.created_at).toLocaleTimeString()}
                </span>
            </div>
            <p className="text-foreground font-medium">{event.raw_content}</p>
            {event.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                    {event.tags.map(tag => (
                        <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-md">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
