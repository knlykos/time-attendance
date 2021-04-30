export interface Department {
  id?: number;
  active?: boolean
  name?: string
  code?: number
  createdBy?: number | null
  createdAt?: Date | string
  updatedBy?: number | null
  updatedAt?: Date | string | null
  deleteAt?: Date | string | null
  deleteBy?: number | null
  description?: string
}
