import { cn } from "../../../lib/utils";
import { type Event } from "../../../services/api";

interface EventItemProps {
    event: Event;
}

export function EventItem({ event }: EventItemProps) {
    // Gradient backgrounds based on severity
    const severityStyles = {
        CRITICAL: "from-destructive/10 to-transparent border-destructive/20 shadow-[0_0_15px_-5px_hsl(var(--destructive))]",
        WARNING: "from-yellow-500/10 to-transparent border-yellow-500/20 shadow-[0_0_15px_-5px_#eab308]",
        INFO: "from-blue-500/10 to-transparent border-blue-500/20 shadow-[0_0_15px_-5px_#3b82f6]",
        UNKNOWN: "from-gray-500/10 to-transparent border-white/10",
    }[event.severity];

    const categoryColors = {
        ISSUE: "bg-red-500/10 text-red-500 border-red-500/20",
        INCIDENT: "bg-red-900/40 text-red-400 border-red-700/50 animate-pulse",
        TASK: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        LOG: "bg-slate-500/10 text-slate-400 border-slate-500/20",
        EVENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        NOTE: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        UNKNOWN: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    };

    const categoryStyle = categoryColors[event.category] || categoryColors.UNKNOWN;

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-xl border p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg bg-gradient-to-br",
            severityStyles
        )}>
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Category Badge */}
                        <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-md border tracking-wider", categoryStyle)}>
                            {event.category}
                        </span>

                        {/* Severity Dot */}
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 border border-white/10">
                            <span className={cn("w-1.5 h-1.5 rounded-full",
                                event.severity === "CRITICAL" ? "bg-red-500 shadow-[0_0_8px_#ef4444]" :
                                    event.severity === "WARNING" ? "bg-yellow-500" : "bg-blue-500"
                            )} />
                            <span className="text-[10px] font-medium text-muted-foreground">{event.severity}</span>
                        </div>

                        {/* Domain Badge */}
                        <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest px-2">
                            {event.domain}
                        </span>
                    </div>

                    <span className="text-[10px] font-mono text-muted-foreground/50 bg-black/20 px-2 py-0.5 rounded">
                        {new Date(event.created_at).toLocaleTimeString([], { hour12: false })}
                    </span>
                </div>

                <div className="pl-1">
                    <p className="text-foreground/90 font-medium leading-relaxed tracking-wide shadow-black drop-shadow-sm">
                        {event.raw_content}
                    </p>

                    {event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-white/5">
                            {event.tags.map(tag => (
                                <span key={tag} className="text-[10px] text-primary/80 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
