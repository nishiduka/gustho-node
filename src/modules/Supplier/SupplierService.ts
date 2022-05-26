import SupplierDTO from './SupplierDTO';
import { createContactSchema, createSchema } from './schema';
import { ISupplierContact, ISupplierCreation } from './TSupplier';
import { NotFoundError } from '../../utils/NotFoundError';
import { ValidationError } from '../../utils/ValidationError';
import SupplierContactDTO from './SupplierContactDTO';
import { sequelize } from '../../lib/sequelize';

export const findOne = async (id: string): Promise<SupplierDTO> => {
  const supplier = await SupplierDTO.findByPk(parseInt(id));

  if (!supplier) {
    throw new NotFoundError('Supplier not found');
  }

  return supplier;
};

// export const createSupplierContact = async (contacts: ISupplierContact[], supplier: SupplierDTO) => {
//   const validation = createContactSchema.validate(contacts)
//   if (validation.error) {
//     throw new ValidationError(validation.error);
//   }

//   for (let index = 0; index < contacts.length; index++) {
//     const element = contacts[index];
//     const contact = await SupplierContactDTO.create(element)
//     supplier.addContact
//   }

//   return await SupplierContactDTO.bulkCreate(contacts);
// }

export const createSupplier = async (body: ISupplierCreation) => {
  const transaction = await sequelize.transaction();

  try {
    // const validation = createSchema.validate(body);

    // if (validation.error) {
    //   throw new ValidationError(validation.error);
    // }

    const supplier = await SupplierDTO.create({
      name: body.name,
      cpnj: body.cpnj,
      ie: body.ie,
      razao_social: body.razao_social,
      nome_fantasia: body.nome_fantasia,
    });

    if (body.contacts?.length) {
      for (let index = 0; index < body.contacts.length; index++) {
        body.contacts[index].supplierId = supplier.id;
      }
    }

    const contacts = await SupplierContactDTO.bulkCreate(
      body.contacts as ISupplierContact[]
    );

    transaction.commit();

    return supplier;
  } catch (error) {
    await transaction.rollback();

    throw error;
  }
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
