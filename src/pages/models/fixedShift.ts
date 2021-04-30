import { Department } from "./department";

export interface FixedShift {
  id?: string;
  active?: boolean;
  start?: number;
  end?: number;
  departments?: Department | number;
  departmentId?: number;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  deleteAt?: Date;
  deleteBy?: string;
}
