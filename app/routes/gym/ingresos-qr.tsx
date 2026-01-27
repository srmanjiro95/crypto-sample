import { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "~/components/common/Card";
import { PageHeader } from "~/components/common/PageHeader";
import { TextField } from "~/components/forms/TextField";
import { checkIns } from "~/data/gym";
import { gymApi } from "~/services/gymApi";
import type { CheckIn } from "~/types/gym/checkin";

export default function IngresosQr() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData) as Record<string, string>;

    const newCheckIn: CheckIn = {
      id: `CHK-${Date.now()}`,
      memberName: payload.memberName ?? "",
      date: payload.date ?? new Date().toISOString(),
      status: "Aceptado",
    };

    const response = await gymApi.registerCheckIn(newCheckIn);
    setMessage(response.message ?? "Ingreso registrado.");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Ingresos con código QR"
        description="Registro rápido de entradas con validación de membresía."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="ID del miembro o QR"
              name="memberName"
              placeholder="Escanea o escribe el ID"
              required
            />
            <TextField
              label="Fecha y hora"
              name="date"
              placeholder="2024-06-12 07:30"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registrando..." : "Registrar ingreso"}
            </button>
            {message ? (
              <p className="text-sm text-emerald-600">{message}</p>
            ) : null}
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Últimos accesos
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            {checkIns.map((checkIn) => (
              <li
                key={checkIn.id}
                className="flex items-center justify-between rounded-xl border border-zinc-100 p-3 dark:border-zinc-800"
              >
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {checkIn.memberName}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {checkIn.date}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-600">
                  {checkIn.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
