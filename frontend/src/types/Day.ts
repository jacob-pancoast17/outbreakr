export interface Day {
    day: number;
    susceptible: number;
    exposed?: number;
    infectious: number;
    recovered: number;
}