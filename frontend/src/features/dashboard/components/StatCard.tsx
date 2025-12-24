import { cn } from "../../../lib/utils";

interface StatCardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
    color: string;
}

export function StatCard({ title, count, icon, color }: StatCardProps) {
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
