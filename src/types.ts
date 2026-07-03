export interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  weight: string;
  allergies: string;
  bloodType: string;
  notes: string;
}

export interface HealthLog {
  id: string;
  childId: string;
  date: string;
  temperature: string; // e.g. "37.2"
  symptoms: string[];
  sleepHours: number;
  appetite: "Normal" | "Poor" | "Increased";
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
  availableSlots: string[];
}

export interface Appointment {
  id: string;
  childId: string;
  childName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  timeSlot: string;
  notes: string;
  status: "upcoming" | "cancelled" | "completed";
}

export interface Disease {
  id: string;
  name: string;
  image: string;
  symptoms: string[];
  whenToSeeDoctor: string[];
  riskFactors: string[];
  prevention: string[];
  homeCare: string[];
  summary: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  date: string;
}
