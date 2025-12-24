import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./features/dashboard/components/Dashboard";
import { InputStream } from "./features/ingest/components/InputStream";
import { Brain } from "lucide-react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen font-sans antialiased pb-20 selection:bg-primary/20 selection:text-primary">

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen" />
        </div>

        {/* Header - Glassmorphic */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-primary to-purple-600 text-white rounded-xl shadow-lg shadow-primary/20 ring-1 ring-white/10">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  Maketronics <span className="font-light text-gray-500">Intelligence</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto max-w-5xl px-4 pt-12 relative z-10">

          <div className="space-y-16">

            {/* 1. Hero / Input Section */}
            <section className="relative">
              <div className="text-center space-y-4 mb-10">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-2">
                  <span>✨ Artificial Intelligence Active</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                  Operational Intelligence
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">
                  Ingest raw operational data. Our AI categorizes, prioritizes, and organizes it into actionable insights in real-time.
                </p>
              </div>
              <div className="max-w-3xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                <InputStream />
              </div>
            </section>

            {/* 2. Dashboard Section */}
            <section className="space-y-8">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Live Feed
                </h3>
              </div>
              <Dashboard />
            </section>

          </div>
        </main>

      </div>
    </QueryClientProvider>
  );
}

export default App;
