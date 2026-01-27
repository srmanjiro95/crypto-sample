import type { CheckIn } from "~/types/gym/checkin";
import type { DevelopmentPlan } from "~/types/gym/plan";
import type { GymMember } from "~/types/gym/member";
import type { FightRecord } from "~/types/gym/record";
import type { MemberMembership } from "~/types/gym/member-membership";
import type { Sale } from "~/types/gym/sale";

export const gymMembers: GymMember[] = [
  {
    id: "MBR-001",
    firstName: "Lucía",
    lastName: "Hernández",
    middleName: "Vega",
    email: "lucia@example.com",
    phone: "55 9898 1212",
    address: "Calle 10 #45, CDMX",
    status: "Activo",
    membership: "Box Fit Mensual",
  },
  {
    id: "MBR-002",
    firstName: "Carlos",
    lastName: "Ramírez",
    middleName: "Vega",
    email: "carlos@example.com",
    phone: "55 1111 3333",
    address: "Av. Patriotismo 220, CDMX",
    status: "Suspendido",
    membership: "Box Pro Trimestral",
  },
];

export const checkIns: CheckIn[] = [
  {
    id: "CHK-001",
    memberName: "Lucía Hernández",
    date: "2024-06-12 07:30",
    status: "Aceptado",
  },
  {
    id: "CHK-002",
    memberName: "Carlos Ramírez",
    date: "2024-06-12 08:10",
    status: "Rechazado",
  },
];

export const fightRecords: FightRecord[] = [
  {
    id: "REC-001",
    memberName: "Lucía Hernández",
    category: "Amateur",
    wins: 6,
    losses: 1,
    draws: 0,
    winsByKo: 2,
    winsByPoints: 4,
  },
  {
    id: "REC-002",
    memberName: "Carlos Ramírez",
    category: "Semiprofesional",
    wins: 10,
    losses: 3,
    draws: 1,
    winsByKo: 5,
    winsByPoints: 5,
  },
];

export const sales: Sale[] = [
  {
    id: "SALE-001",
    customer: "Lucía Hernández",
    product: "Guantes 14 oz",
    quantity: 1,
    total: 1200,
    date: "2024-06-11 18:30",
  },
  {
    id: "SALE-002",
    customer: "Cliente externo",
    product: "Protector bucal",
    quantity: 2,
    total: 360,
    date: "2024-06-11 19:10",
  },
];

export const memberMemberships: MemberMembership[] = [
  {
    id: "MBRM-001",
    memberName: "Lucía Hernández",
    membership: "Box Fit Mensual",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    status: "Vigente",
  },
  {
    id: "MBRM-002",
    memberName: "Carlos Ramírez",
    membership: "Box Pro Trimestral",
    startDate: "2024-03-20",
    endDate: "2024-06-20",
    status: "Por vencer",
  },
];

export const developmentPlans: DevelopmentPlan[] = [
  {
    id: "PLAN-001",
    memberName: "Lucía Hernández",
    focus: "Resistencia y defensa",
    coach: "Coach Mariana",
    sessionsPerWeek: 4,
  },
  {
    id: "PLAN-002",
    memberName: "Carlos Ramírez",
    focus: "Potencia y velocidad",
    coach: "Coach Roberto",
    sessionsPerWeek: 5,
  },
];
