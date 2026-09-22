import { test , expect } from '@playwright/test';
import { logger } from '@src/utils/logger';

// test('crud operation' , async({request})=>{
//      const res= await request.get('/ping');
//      expect(res.status()).toBe(201);
//      const text = await res.text();
//      expect(text).toContain('Created');
// });

test('TC-1: Verify the Create booking', async({request})=>{
    const payload = {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
    };

    const responseData = await request.post('/booking', {
        data: payload,
    });

    expect(responseData.status()).toBe(200);
    const data = await responseData.json();
    expect(data.bookingid).toBeTruthy();
    expect(data.booking.firstname).toBe(payload.firstname);
    expect(data.booking.lastname).toBe(payload.lastname);
    logger.info(`Created booking id:${data.bookingid}`);
});