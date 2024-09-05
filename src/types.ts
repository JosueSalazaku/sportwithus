export interface Month {
    id: number;
    name: string;
    month: string;
    activities: Avtivities[];
    activityName: string;
    yeart: number;
}
  
export interface Avtivities {
    id: number
    name: string;
    descripton: string;
    date: string;
    location: string;
    price: number;
    participants: number;
}