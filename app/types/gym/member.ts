export interface GymMember {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContacts?: { name: string; phone: string }[];
  status: "Activo" | "Suspendido" | "Baja";
  membership: string;
}
