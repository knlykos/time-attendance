
export interface Employee {
  id?: number;
  active?: boolean
  userRole?: number | null
  username: string
  password: string
  email: string
  firstname?: string | null
  lastname?: string | null
  businessTitle?: string | null
  timeType?: number | null
  phone?: string | null
  street?: string | null
  apartment?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  hireDate?: Date | string | null
  dateBirth?: Date | string | null
  createdBy?: number | null
  createdAt?: Date | string
  updatedBy?: number | null
  updatedAt?: Date | string | null
  deleteAt?: Date | string | null
  deleteBy?: number | null
};
