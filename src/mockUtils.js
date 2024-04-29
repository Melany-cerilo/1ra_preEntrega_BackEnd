import { fakerES as faker } from "@faker-js/faker";

export const generateProduct = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 1, max: 99999 }),
    code: faker.number.int({ min: 1, max: 9999999999 }),
    stock: faker.number.int({ min: 1, max: 9999999999 }),
    category: faker.commerce.productAdjective(),
  };
};
