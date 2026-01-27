export interface MemberMembership {
  id: string;
  memberName: string;
  membership: string;
  startDate: string;
  endDate: string;
  status: "Vigente" | "Por vencer" | "Vencida";
}
