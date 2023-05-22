type Product = {
  id: number;

  name: string;

  price: number;

  rating: number;

  mainDescription: string;

  img: string;

  brand?: string;

  type?: string;

  info?: { title?: string; description?: string }[];
};

export type { Product };
