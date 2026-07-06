import { AlertCircle, ClipboardList, FileQuestion, Home, Loader2, RefreshCw, ServerCrash, Search, WifiOff } from "lucide-react";
import { buttonStyles } from "../../constants/ui";
import { Spinner } from "../common/Spinner";

function SkeletonItem() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
      <div className="w-5 h-5 rounded-md bg-muted animate-pulse flex-shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted animate-pulse rounded-md w-3/4" />
        <div className="h-3 bg-muted animate-pulse rounded-md w-32" />
      </div>
      <div className="flex gap-1">
        <div className="w-8 h-8 bg-muted animate-pulse rounded-lg" />
        <div className="w-8 h-8 bg-muted animate-pulse rounded-lg" />
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner size={16} className="text-primary" />
          Loading tasks...
        </div>
      </div>
      {[1, 2, 3, 4].map((i) => <SkeletonItem key={i} />)}
    </div>
  );
}

export function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        {filtered ? <Search size={28} className="text-muted-foreground/50" /> : <ClipboardList size={28} className="text-muted-foreground/50" />}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {filtered ? "No tasks found" : "No tasks yet"}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {filtered ? "Try adjusting your search or filter to find what you are looking for." : "Create your first task above to get started."}
      </p>
    </div>
  );
}

export function DataErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 flex flex-col items-center text-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center">
        <AlertCircle size={24} className="text-destructive" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-rose-900 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Something went wrong</h3>
        <p className="text-sm text-rose-700">Cannot connect to server.</p>
        <p className="text-sm text-rose-600/80">Please try again.</p>
      </div>
      <button onClick={onRetry} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-white text-sm font-medium hover:opacity-90 transition-opacity">
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );
}

export function Page404({ onHome }: { onHome: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mb-6">
        <FileQuestion size={44} className="text-muted-foreground/40" />
      </div>
      <p className="text-8xl font-bold text-muted-foreground/20 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>404</p>
      <h2 className="text-2xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Page Not Found</h2>
      <p className="text-sm text-muted-foreground max-w-xs mb-8">The page you are looking for does not exist or has been moved.</p>
      <button onClick={onHome} className={`${buttonStyles.primary}`}>
        <Home size={15} /> Back to Home
      </button>
    </div>
  );
}

export function Page500({ onRetry, onHome }: { onRetry: () => void; onHome: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 rounded-3xl bg-rose-50 flex items-center justify-center mb-6">
        <ServerCrash size={44} className="text-rose-300" />
      </div>
      <p className="text-8xl font-bold text-rose-100 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>500</p>
      <h2 className="text-2xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Server Error</h2>
      <p className="text-sm text-muted-foreground max-w-xs mb-8">Something went wrong on the server. Our team has been notified.</p>
      <div className="flex gap-3">
        <button onClick={onRetry} className={buttonStyles.secondary}><RefreshCw size={14} /> Retry</button>
        <button onClick={onHome} className={buttonStyles.primary}><Home size={14} /> Go Home</button>
      </div>
    </div>
  );
}

export function PageNetwork({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 rounded-3xl bg-amber-50 flex items-center justify-center mb-6">
        <WifiOff size={44} className="text-amber-300" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>No Connection</h2>
      <p className="text-sm text-muted-foreground max-w-xs mb-2">Cannot connect to server.</p>
      <p className="text-sm text-muted-foreground/70 max-w-xs mb-8">Please check your internet connection and try again.</p>
      <button onClick={onRetry} className={buttonStyles.primary}><RefreshCw size={14} /> Retry</button>
    </div>
  );
}
