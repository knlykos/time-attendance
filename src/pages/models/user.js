//@flow
type User = {
  id?: number,
  userRole?: number,
  username?: string,
  password?: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  secondPhone: string,
  businessTitle: string,
  timeType: number,
  street: string,
  apartment: string,
  city: string,
  state: string,
  zipCode: number,
  hireDate: Date,
};

export type { User };
