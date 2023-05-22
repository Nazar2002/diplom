import { deviceAction, deviceReducer, DeviceTypeState } from './device';

describe('deviceSlice', () => {
  let initialState: DeviceTypeState;

  beforeEach(() => {
    initialState = {
      load: false,

      deviceList: null,

      device: null,

      brand: null,

      type: null,

      filterConfig: {
        brandId: null,

        typeId: null
      }
    };
  });

  describe('reducers', () => {
    it('change set load', () => {
      const newState = deviceReducer(initialState, deviceAction.setLoad(true));

      expect(newState.load).toBe(true);
    });

    it('add devices', () => {
      const deviceList = [
        {
          id: 1,

          name: 'IPhone 13',

          price: 30000,

          rating: 4,

          mainDescription: 'Загальний опис',

          img: ''
        }
      ];

      const newState = deviceReducer(initialState, deviceAction.setDeviceList(deviceList));

      expect(newState.deviceList).toEqual(deviceList);
    });

    it('set one device', () => {
      const device = {
        id: 1,

        name: 'IPhone 13',

        price: 30000,

        rating: 4,

        mainDescription: 'Загальний опис',

        img: ''
      };

      const newState = deviceReducer(initialState, deviceAction.setDevice(device));

      expect(newState.device).toEqual(device);
    });

    it('should handle setBrand', () => {
      const brand = { id: 1, name: 'iPhone' };

      const newState = deviceReducer(initialState, deviceAction.setBrand(brand));

      expect(newState.brand).toEqual(brand);
    });

    it('should handle setType', () => {
      const type = { id: 1, name: 'iPhone' };

      const newState = deviceReducer(initialState, deviceAction.setType(type));

      expect(newState.type).toEqual(type);
    });

    it('setFilterConfig', () => {
      const filterConfig = { brandId: 1, typeId: 1 };

      const newState = deviceReducer(initialState, deviceAction.setFilterConfig(filterConfig));

      expect(newState.filterConfig).toEqual(filterConfig);
    });
  });
});
