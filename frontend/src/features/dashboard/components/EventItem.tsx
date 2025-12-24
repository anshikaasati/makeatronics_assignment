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
