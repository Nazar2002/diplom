import { brandTypeSlice } from './brand-type';

describe('brandTypeSlice', () => {
  it('should return the initial state', () => {
    expect(brandTypeSlice.reducer(undefined, {})).toEqual({
      load: false,

      brands: [],

      types: []
    });
  });

  it('should set load to true', () => {
    const state = { load: false, brands: [], types: [] };

    expect(brandTypeSlice.reducer(state, brandTypeSlice.actions.setLoad(true))).toEqual({
      load: true,

      brands: [],

      types: []
    });
  });

  it('should set brands', () => {
    const state = { load: false, brands: [], types: [] };

    const brands = [
      { id: 1, name: 'Samsung' },

      { id: 2, name: 'iPhone' }
    ];

    expect(brandTypeSlice.reducer(state, brandTypeSlice.actions.setBrands(brands))).toEqual({
      load: false,

      brands: [
        { id: 1, name: 'Samsung' },

        { id: 2, name: 'iPhone' }
      ],

      types: []
    });
  });

  it('should set types', () => {
    const state = { load: false, brands: [], types: [] };

    const types = [
      { id: 1, name: 'Телефони' },

      { id: 2, name: 'Навушники' }
    ];

    expect(brandTypeSlice.reducer(state, brandTypeSlice.actions.setTypes(types))).toEqual({
      load: false,

      brands: [],

      types: [
        { id: 1, name: 'Телефони' },

        { id: 2, name: 'Навушники' }
      ]
    });
  });
});
