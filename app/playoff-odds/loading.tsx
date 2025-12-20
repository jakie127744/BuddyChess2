export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-12 w-96 bg-secondary animate-pulse rounded mb-2" />
          <div className="h-4 w-64 bg-secondary animate-pulse rounded" />
        </div>
        <div className="grid gap-6">
          <div className="h-48 bg-secondary animate-pulse rounded" />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="h-96 bg-secondary animate-pulse rounded" />
            <div className="h-96 bg-secondary animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
