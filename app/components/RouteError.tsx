
type Props = {
  error: unknown;
  title?: string;
};

export function RouteError({
  error,
  title = "Ocurrió un error",
}: Props) {
  const message =
    error instanceof Error ? error.message : "Error inesperado";

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-red-900 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-100">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="mt-2 text-sm">{message}</p>
        <p className="mt-3 text-sm opacity-80">
          Try reloading the page in a few seconds.
        </p>
      </div>
    </main>
  );
}
