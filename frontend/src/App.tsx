import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./features/dashboard/components/Dashboard";
import { InputStream } from "./features/ingest/components/InputStream";
import { Brain } from "lucide-react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background font-sans antialiased pb-20">

        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center gap-3">
            <div className="p-2 bg-primary text-primary-foreground rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Maketronics Intelligence</h1>
              <p className="text-xs text-muted-foreground">Self-Organizing Operational System</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto max-w-5xl px-4 pt-8">

          <div className="space-y-12">

            {/* 1. Input Section */}
            <section>
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">From Chaos to Clarity</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Dump your raw operational noise below. We'll find the signal.
                </p>
              </div>
              <InputStream />
            </section>

            {/* 2. Dashboard Section */}
            <section>
              <Dashboard />
            </section>

          </div>
        </main>

      </div>
    </QueryClientProvider>
  );
}

export default App;
