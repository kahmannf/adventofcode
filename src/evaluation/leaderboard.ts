import { User } from "./user";

export interface Leaderboard {
  owner_id: string;
  event: string;
  members: {
    [id in string]: User
  }
}