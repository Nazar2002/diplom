import { basketSlice, BasketState } from './basket';

describe('basket slice', () => {
  let initialState: BasketState;

  beforeEach(() => {
    initialState = {
      load: false,

      point: false,

      basketList: []
    };
  });

  it('should handle setLoad', () => {
    const newState = basketSlice.reducer(initialState, basketSlice.actions.setLoad(true));

    expect(newState.load).toBe(true);
  });

  it('should handle setPoint', () => {
    const newState = basketSlice.reducer(initialState, basketSlice.actions.setPoint(true));

    expect(newState.point).toBe(true);
  });

  it('should handle setBasketList', () => {
    const iphone = {
      id: 1,

      name: 'IPhone 14 Pro',

      price: 50000,

      rating: 5,

      mainDescription: 'Загальний опис',

      img: 'image1.jpg',

      brand: 'IPhone',

      type: 'Телефони',

      info: [
        { title: 'Матриця', description: 'OLED' },

        { title: 'Основна камера', description: '48Мп + 12Мп + 12Мп' }
      ]
    };

    const samsung = {
      id: 2,

      name: 'Samsung Galaxy S23 Ultra',

      price: 62000,

      rating: 5,

      mainDescription: 'Загальний опис',

      img: 'image1.jpg',

      brand: 'Samsung',

      type: 'Телефони',

      info: [
        { title: 'Матриця', description: 'Dynamic AMOLED 2X' },

        { title: 'Основна камера', description: '200Мп + 10Мп + 12Мп + 10Мп' }
      ]
    };

    const payload = [iphone, samsung];

    const newState = basketSlice.reducer(initialState, basketSlice.actions.setBasketList(payload));

    expect(newState.basketList).toEqual(payload);
  });

  it('should handle setLoad with false payload', () => {
    const newState = basketSlice.reducer(initialState, basketSlice.actions.setLoad(false));

    expect(newState.load).toBe(false);
  });

  it('should handle setPoint with false payload', () => {
    const newState = basketSlice.reducer(initialState, basketSlice.actions.setPoint(false));

    expect(newState.point).toBe(false);
  });

  it('should handle setBasketList with empty payload', () => {
    const newState = basketSlice.reducer(initialState, basketSlice.actions.setBasketList([]));

    expect(newState.basketList).toEqual([]);
  });

  it('should handle setBasketList with duplicate products', () => {
    const iphone = {
      id: 1,

      name: 'IPhone 14 Pro',

      price: 50000,

      rating: 5,

      mainDescription: 'Загальний опис',

      img: 'image1.jpg',

      brand: 'IPhone',

      type: 'Телефони',

      info: [
        { title: 'Матриця', description: 'OLED' },

        { title: 'Основна камера', description: '48Мп + 12Мп + 12Мп' }
      ]
    };

    const payload = [iphone, iphone];

    const newState = basketSlice.reducer(initialState, basketSlice.actions.setBasketList(payload));

    expect(newState.basketList).toEqual(payload);
  });
});
