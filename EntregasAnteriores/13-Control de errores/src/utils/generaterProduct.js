import { faker } from "@faker-js/faker";

export const generatorProductMock = async () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    status: faker.commerce.productMaterial(),
    category: faker.commerce.productMaterial(),
    thumbnail: faker.image.url(),
    code: faker.number.int({ min: 100000 }),
    stock: faker.number.int({ min: 1, max: 10 }),
  };
};
