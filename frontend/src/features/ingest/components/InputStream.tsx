import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useIngest } from "../hooks/useIngest";

export function InputStream() {
    const { text, setText, submit, isLoading } = useIngest();

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg border shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-4 text-primary">Input Stream</h2>
            <form onSubmit={submit} className="flex gap-2">
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter raw operational log, note, or event..."
                    className="flex-1"
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !text.trim()}>
                    {isLoading ? (
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
