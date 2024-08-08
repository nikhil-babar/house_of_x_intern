export interface URL {
  id: string;
  user_id: string;
  url: string;
  redirect_url: string;
  user_count: number;
  created_at: string;
  updated_at: string;
  category: string;
  name: string;
}

export interface User {
  name: string;
  email: string;
  id: string;
  created_at: string;
  updated_at: string;
}

declare module "knex/types/tables" {
  interface Tables {
    User: User;
    URL: URL;
  }
}
