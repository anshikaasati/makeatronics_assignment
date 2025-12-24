import { cn } from "../../../lib/utils";
import { type Event } from "../../../services/api";

interface EventItemProps {
    event: Event;
}

export function EventItem({ event }: EventItemProps) {
    const severityColor = {
        CRITICAL: "border-l-destructive bg-destructive/5",
        WARNING: "border-l-yellow-500 bg-yellow-500/5",
        INFO: "border-l-blue-500 bg-blue-500/5",
        UNKNOWN: "border-l-gray-300",
    }[event.severity];

    const categoryColors = {
        ISSUE: "text-red-500 border-red-500/20",
        INCIDENT: "text-red-700 border-red-700/20",
        TASK: "text-green-600 border-green-500/20",
        LOG: "text-gray-500 border-gray-500/20",
        EVENT: "text-blue-500 border-blue-500/20",
        NOTE: "text-amber-600 border-amber-500/20",
        UNKNOWN: "text-muted-foreground border-border",
    };

    const categoryStyle = categoryColors[event.category] || categoryColors.UNKNOWN;

    return (
        <div className={cn("p-4 border-l-4 hover:bg-muted/50 transition-colors", severityColor)}>
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                    {/* Severity Badge */}
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border",
                        event.severity === "CRITICAL" ? "text-destructive border-destructive/20" :
                            event.severity === "WARNING" ? "text-yellow-600 border-yellow-500/20" :
                                "text-blue-600 border-blue-500/20"
                    )}>
                        {event.severity}
                    </span>

                    {/* Category Badge */}
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border uppercase", categoryStyle)}>
                        {event.category}
                    </span>

                    {/* Domain Badge */}
                    <span className={cn("text-xs font-medium text-muted-foreground uppercase tracking-wide")}>
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
