import { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "~/components/common/Card";
import { PageHeader } from "~/components/common/PageHeader";
import { FileField } from "~/components/forms/FileField";
import { FormSection } from "~/components/forms/FormSection";
import { SelectField } from "~/components/forms/SelectField";
import { TextAreaField } from "~/components/forms/TextAreaField";
import { TextField } from "~/components/forms/TextField";
import { gymMembers } from "~/data/gym";
import { gymApi } from "~/services/gymApi";
import type { GymMember } from "~/types/gym/member";

export default function MiembrosGym() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData) as Record<string, string>;

    const newMember: GymMember = {
      id: `MBR-${Date.now()}`,
      firstName: payload.firstName ?? "",
      lastName: payload.lastName ?? "",
      middleName: payload.middleName ?? "",
      email: payload.email ?? "",
      phone: payload.phone ?? "",
      address: payload.address ?? "",
      emergencyContacts: [
        { name: payload.contactOneName ?? "", phone: payload.contactOnePhone ?? "" },
        { name: payload.contactTwoName ?? "", phone: payload.contactTwoPhone ?? "" },
      ],
      status: (payload.status as GymMember["status"]) ?? "Activo",
      membership: payload.membership ?? "Sin asignar",
    };

    const response = await gymApi.createMember(newMember);
    setMessage(response.message ?? "Miembro registrado.");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Registro de miembros"
        description="Alta, baja y consulta de miembros del gimnasio."
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Datos del miembro">
              <FileField label="Foto" name="photo" accept="image/*" />
              <TextField label="Nombre" name="firstName" required />
              <TextField label="Apellido paterno" name="lastName" required />
              <TextField label="Apellido materno" name="middleName" />
              <TextField
                label="Celular"
                name="phone"
                placeholder="55 0000 0000"
                required
              />
              <TextField
                label="Correo"
                name="email"
                type="email"
                placeholder="miembro@gym.mx"
                required
              />
              <SelectField
                label="Estatus"
                name="status"
                options={[
                  { label: "Activo", value: "Activo" },
                  { label: "Suspendido", value: "Suspendido" },
                  { label: "Baja", value: "Baja" },
                ]}
              />
              <TextField
                label="Membresía"
                name="membership"
                placeholder="Box Fit Mensual"
              />
            </FormSection>

            <FormSection title="Dirección">
              <TextAreaField
                label="Dirección completa"
                name="address"
                placeholder="Calle, número, ciudad"
                className="md:col-span-2"
                required
              />
            </FormSection>

            <FormSection title="Contactos de emergencia">
              <TextField
                label="Contacto 1 - Nombre"
                name="contactOneName"
                placeholder="Nombre completo"
              />
              <TextField
                label="Contacto 1 - Celular"
                name="contactOnePhone"
                placeholder="55 0000 0000"
              />
              <TextField
                label="Contacto 2 - Nombre"
                name="contactTwoName"
                placeholder="Nombre completo"
              />
              <TextField
                label="Contacto 2 - Celular"
                name="contactTwoPhone"
                placeholder="55 0000 0000"
              />
            </FormSection>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Registrar miembro"}
              </button>
              {message ? (
                <span className="text-sm text-emerald-600">{message}</span>
              ) : null}
            </div>
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Miembros registrados
          </h3>
          <div className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
            {gymMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800"
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {member.firstName} {member.lastName}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {member.membership} · {member.status}
                </p>
                <p className="mt-1 text-xs">{member.email}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
