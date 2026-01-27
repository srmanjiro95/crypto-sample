import { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "~/components/common/Card";
import { PageHeader } from "~/components/common/PageHeader";
import { SelectField } from "~/components/forms/SelectField";
import { TextField } from "~/components/forms/TextField";
import { memberMemberships } from "~/data/gym";
import { gymApi } from "~/services/gymApi";
import type { MemberMembership } from "~/types/gym/member-membership";

export default function MembresiasGym() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData) as Record<string, string>;

    const newAssignment: MemberMembership = {
      id: `MBRM-${Date.now()}`,
      memberName: payload.memberName ?? "",
      membership: payload.membership ?? "",
      startDate: payload.startDate ?? "",
      endDate: payload.endDate ?? "",
      status: (payload.status as MemberMembership["status"]) ?? "Vigente",
    };

    const response = await gymApi.assignMembership(newAssignment);
    setMessage(response.message ?? "Membresía asignada.");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Membresías activas"
        description="Asignación, altas y vencimientos por miembro."
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
              label="Membresía"
              name="membership"
              placeholder="Box Fit Mensual"
              required
            />
            <TextField label="Inicio" name="startDate" placeholder="2024-06-01" />
            <TextField label="Vencimiento" name="endDate" placeholder="2024-06-30" />
            <SelectField
              label="Estatus"
              name="status"
              options={[
                { label: "Vigente", value: "Vigente" },
                { label: "Por vencer", value: "Por vencer" },
                { label: "Vencida", value: "Vencida" },
              ]}
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Asignar"}
            </button>
            {message ? (
              <p className="text-sm text-emerald-600">{message}</p>
            ) : null}
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Membresías por miembro
          </h3>
          <div className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
            {memberMemberships.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {assignment.memberName}
                  </p>
                  <span className="text-xs font-semibold text-amber-600">
                    {assignment.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {assignment.membership} · {assignment.startDate} → {assignment.endDate}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
