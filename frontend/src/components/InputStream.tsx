import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Loader2 } from "lucide-react";

export function InputStream() {
    const [text, setText] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: api.ingest,
        onSuccess: () => {
            setText("");
            // Invalidate queries to refresh the feed
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["analytics"] });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        mutation.mutate(text);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg border shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">Input Stream</h2>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter raw operational log, note, or event..."
                    className="flex-1"
                    disabled={mutation.isPending}
                />
                <Button type="submit" disabled={mutation.isPending || !text.trim()}>
                    {mutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
                Examples: "Motor overheating at Zone B", "Review meeting delayed",
                "Vendor X shipment pending"
            </p>
        </div>
    );
}
