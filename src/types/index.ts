export interface Restaurant {
  address: string;
  attributes: Record<string, string>;
  business_id: string;
  categories: string;
  city: string;
  hours: Record<string, string> | null;
  is_open: number;
  latitude: number;
  longitude: number;
  name: string;
  postal_code: string;
  review_count: number;
  stars: number;
  state: string;
}
