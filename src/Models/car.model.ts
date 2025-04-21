export type CarModel =  {
  id: number;
  short_name: string; // Aqui quero apenas o nome do carro, com a marca, exemplo: 'Honda Civic'
  full_name: string; // Aqui quero o nome completo do carro, com a marca e o modelo, exemplo: 'Honda Civic 2.0 EXL 16V Flex 4p Aut.'
  brand: string;
  year: string;
  color: string;
  price: number;
  images:  string[] | null;
  transmission: string;
  fuel: "Elétrico" | "Hibrido" | "Gasolina" | "Diesel" | "Etanol" | "Flex" | "GNV";
  kilometers: number;
  location: string;
  dealer: {
    name: string;
    email: string;
    phone: string;
    company: boolean;
  }
  liked: boolean;
}
