import { test , expect } from '@playwright/test';
import { logger } from '@src/utils/logger';

// test('crud operation' , async({request})=>{
//      const res= await request.get('/ping');
//      expect(res.status()).toBe(201);
//      const text = await res.text();
//      expect(text).toContain('Created');
// });
const bookingid ="";
const token=" ";
const baseUrl = "https://restful-booker.herokuapp.com";
test('TC-1: Verify the update booking', async({request})=>{
    const payload = {
        firstname: 'Sangeetha',
        lastname: 'Ganesan',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01',
        },
        additionalneeds: 'Breakfast',
    };
    const headers={
        'Content-Type' :'application/json',
        'Cookie' : `token = ${token}`
    }


    const responseData = await request.put(`${baseUrl}/booking/${bookingid}`, {
        data: payload,
        headers:headers,
    });

    expect(responseData.status()).toBe(200);
    const data = await responseData.json();
    expect(data.bookingid).toBeTruthy();
    expect(data.booking.firstname).toBe(payload.firstname);
    expect(data.booking.lastname).toBe(payload.lastname);
    logger.info(`Created booking id:${data.bookingid}`);
});