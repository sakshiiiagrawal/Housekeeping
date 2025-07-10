export interface Room {
  number: string;
  floor: number;
  credits: number;
  isDeparture?: boolean;
  isStay?: boolean;
  isCombined?: boolean;
  combinedWith?: string;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  fixedRooms: string[];
  assignedRooms: string[];
  totalCredits: number;
  floors: number[];
}

export interface Assignment {
  teamId: string;
  rooms: string[];
  totalCredits: number;
  floors: number[];
}

export interface AssignmentConstraints {
  minCredits: number;
  maxCredits: number;
  maxFloorsPerTeam: number;
  maxTeamsPerFloor: number;
}

export interface DailyAssignment {
  date: string;
  availableRooms: Room[];
  teams: Team[];
  assignments: Assignment[];
  constraints: AssignmentConstraints;
} 