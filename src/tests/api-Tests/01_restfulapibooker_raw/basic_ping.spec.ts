import { test , expect} from '@playwright/test';

test('Ping request' ,async({request}) => {
      const responseData = await request.get('/ping');
      expect(responseData.status()).toBe(201);

});