import { useState } from "react";
import type { FormEvent } from "react";
import { Card } from "~/components/common/Card";
import { PageHeader } from "~/components/common/PageHeader";
import { TextAreaField } from "~/components/forms/TextAreaField";
import { TextField } from "~/components/forms/TextField";
import { roles } from "~/data/admin";
import { gymApi } from "~/services/gymApi";
import type { Role } from "~/types/admin/role";

export default function RolesPermisos() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData) as Record<string, string>;

    const newRole: Role = {
      id: `ROL-${Date.now()}`,
      name: payload.name ?? "",
      permissions: (payload.permissions ?? "")
        .split(",")
        .map((permission) => permission.trim())
        .filter(Boolean),
    };

    const response = await gymApi.createRole(newRole);
    setMessage(response.message ?? "Rol creado.");
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Roles y permisos"
        description="Define perfiles básicos para el equipo administrativo."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Nombre del rol"
              name="name"
              placeholder="Administrador"
              required
            />
            <TextAreaField
              label="Permisos (separados por coma)"
              name="permissions"
              placeholder="Usuarios, Inventario, Membresías"
              className="md:col-span-2"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Crear rol"}
            </button>
            {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
          </form>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Roles configurados
          </h3>
          <div className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
            {roles.map((role) => (
              <div
                key={role.id}
                className="rounded-xl border border-zinc-100 p-3 dark:border-zinc-800"
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {role.name}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {role.permissions.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
