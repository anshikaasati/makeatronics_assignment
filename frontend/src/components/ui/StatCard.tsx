import { cn } from "../../lib/utils";

interface StatCardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
    color: string;
}

export function StatCard({ title, count, icon, color }: StatCardProps) {
    return (
        <div className="group relative overflow-hidden bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex items-center justify-between">
            {/* Background Gradient Blob */}
            <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-2xl", color.replace('text-', 'bg-'))} />

            <div className="relative z-10">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{title}</p>
                <div className="flex items-baseline gap-1 mt-2">
                    <p className={cn("text-4xl font-bold tracking-tight", color)}>{count}</p>
                    <span className="text-xs text-muted-foreground font-medium">events</span>
                </div>
            </div>

            <div className={cn("relative z-10 p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300", color)}>
                {icon}
            </div>
        </div>
    );
}
