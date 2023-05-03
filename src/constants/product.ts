export enum EProduct {
  PRODUCT_1 = 'product1',
  PRODUCT_2 = 'product2',
}

export const PRODUCT_LABELS = {
  [EProduct.PRODUCT_1]: 'Продукт 1',
  [EProduct.PRODUCT_2]: 'Продукт 2',
} as const

export const LS_PRODUCT_KEY = 'product'
