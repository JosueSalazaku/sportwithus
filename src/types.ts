export interface Month {
    id: number;
    name: string;
    month: string;
    activities: Activities[];
    activity_name: string;
    activity_id: number;
    yeart: number;
}
  
export interface Activities {
    id: number
    name: string;
    description: string;
    date: string;
    location: string;
    price: number;
    participants: number;
}

export interface Participants {
    id: number;
    name: string;
    activity: string;
    email: string;
}