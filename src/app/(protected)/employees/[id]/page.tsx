export default function EmployeePage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full rounded-lg border border-[var(--gray3)] bg-[var(--gray1)] p-6 pt-8">
      <h1 className="text-3xl font-bold mb-2 text-center">Employee: {params.id}</h1>
      <p className="text-sm text-center">Employee details will be displayed here.</p>
    </div>
  )
}
