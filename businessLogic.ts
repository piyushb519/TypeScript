
export enum Role {
  QA,
  Development,
  DevOps,
  UIDesign
}
export interface CRUD<T, U> {
  loadAndRefresh(): void;
  create(a: T[]): void;
  editData(row_num: U): void;
  deleteData(row_num: U): void;
}

export class Employee {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: number;
  email: string;
  role: Role;
  address: string;
}

export class operations implements CRUD<Employee, number> {
  async loadAndRefresh() {
    let response = await fetch("data.json");
    let data = (await response).json();

    return data;
  }
  create(Emp: Employee[]) {}
  editData(num: number) {}
  deleteData(num: number) {}
}