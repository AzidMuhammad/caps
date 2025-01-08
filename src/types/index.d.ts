export interface Vehicle {
  id: string;
  plateNumber: string;
  status: "pending" | "in-progress" | "done";
  station: string;
}

export interface Station {
  id: string;
  name: string;
  location: string;
}
