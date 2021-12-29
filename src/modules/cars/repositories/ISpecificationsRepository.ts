import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ICreateCategoryDTO } from "./ICategoriesRepository";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository };
