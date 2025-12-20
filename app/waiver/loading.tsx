export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-12 w-96 bg-secondary animate-pulse rounded mb-2" />
          <div className="h-4 w-64 bg-secondary animate-pulse rounded" />
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-secondary animate-pulse rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
