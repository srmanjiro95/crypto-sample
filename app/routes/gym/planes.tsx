import { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "~/components/common/Card";
import { PageHeader } from "~/components/common/PageHeader";
import { TextAreaField } from "~/components/forms/TextAreaField";
import { TextField } from "~/components/forms/TextField";
import { developmentPlans } from "~/data/gym";
import { gymApi } from "~/services/gymApi";
import type { DevelopmentPlan } from "~/types/gym/plan";

export default function PlanesGym() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData) as Record<string, string>;

    const newPlan: DevelopmentPlan = {
      id: `PLAN-${Date.now()}`,
      memberName: payload.memberName ?? "",
      focus: payload.focus ?? "",
      coach: payload.coach ?? "",
      sessionsPerWeek: Number(payload.sessionsPerWeek ?? 0),
    };

    const response = await gymApi.createPlan(newPlan);
    setMessage(response.message ?? "Plan creado.");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Planes de desarrollo"
        description="Diseña rutinas personalizadas por alumno (opcional)."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Miembro"
              name="memberName"
              placeholder="Lucía Hernández"
              required
            />
            <TextField
              label="Coach responsable"
              name="coach"
              placeholder="Coach Mariana"
            />
            <TextField
              label="Sesiones por semana"
              name="sessionsPerWeek"
              type="number"
            />
            <TextAreaField
              label="Ejercicios / Rutinas"
              name="focus"
              placeholder="Trabajo de resistencia, sombra, cardio"
              className="md:col-span-2"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Registrar plan"}
            </button>
            {message ? (
              <p className="text-sm text-emerald-600">{message}</p>
            ) : null}
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Planes activos
          </h3>
          <div className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
            {developmentPlans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800"
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {plan.memberName}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {plan.focus}
                </p>
                <p className="mt-1 text-xs">
                  Coach: {plan.coach} · {plan.sessionsPerWeek} sesiones/semana
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
