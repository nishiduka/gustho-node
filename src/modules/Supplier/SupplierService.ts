import SupplierDTO from './SupplierDTO';
import { createSchema } from './schema';
import { ISupplierCreation } from './TSupplier';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';

export const findOne = async (id: string): Promise<SupplierDTO> => {
  const supplier = await SupplierDTO.findByPk(parseInt(id));

  if (!supplier) {
    throw new NotFoundError('Supplier not found');
  }

  return supplier;
};

export const createSupplier = async (body: ISupplierCreation) => {
  const validation = createSchema.validate(body);

  if (validation.error) {
    throw new ValidationError(validation.error);
  }

  const supplier = await SupplierDTO.create({
    name: body.name,
    cpnj: body.cpnj,
    ie: body.ie,
    razao_social: body.razao_social,
    nome_fantasia: body.nome_fantasia,
  });

  return supplier;
};

export const updateSupplier = async (id: string, body: ISupplierCreation) => {
  try {
    const validation = createSchema.validate(body);

    if (validation.error) {
      throw validation.error;
    }

    const supplier = await findOne(id);

    supplier.name = body.name;
    supplier.cpnj = body.cpnj;
    supplier.ie = body.ie;
    supplier.razao_social = body.razao_social;
    supplier.nome_fantasia = body.nome_fantasia;

    return supplier.save();
  } catch (error) {
    throw error;
  }
};

export const removeSupplier = async (id: string) => {
  try {
    const supplier = await findOne(id);

    return supplier.destroy();
  } catch (error) {
    throw error;
  }
};
