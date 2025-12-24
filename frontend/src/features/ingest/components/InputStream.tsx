import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useIngest } from "../hooks/useIngest";

export function InputStream() {
    const { text, setText, submit, isLoading } = useIngest();

    return (
        <div className="w-full relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative w-full bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-2xl ring-1 ring-white/5">
                <form onSubmit={submit} className="flex items-center gap-2">
                    <div className="pl-4 text-emerald-500 animate-pulse font-mono text-lg select-none">
                        ❯
                    </div>

                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Initialize log sequence..."
                        className="flex-1 bg-transparent border-none text-lg text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 font-mono w-full"
                        disabled={isLoading}
                        autoFocus
                    />

                    <Button
                        type="submit"
                        disabled={isLoading || !text.trim()}
                        className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 ml-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <div className="flex items-center gap-2 font-semibold">
                                <span className="hidden sm:inline">PROCESS</span>
                                <Send className="w-4 h-4" />
                            </div>
                        )}
                    </Button>
                </form>
            </div>

            <div className="flex justify-between items-center px-4 mt-3">
                <p className="text-[10px] text-muted-foreground/60 font-mono tracking-wider">
                    SYSTEM_READY // AWAITING_INPUT
                </p>
                <div className="flex gap-2 text-[10px] text-muted-foreground/50">
                    <span>Try: "Core meltdown imminent"</span>
                </div>
            </div>
        </div>
    );
}
