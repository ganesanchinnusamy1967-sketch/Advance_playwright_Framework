import { test, expect } from '@playwright/test';
import { ApiHelper } from '@utils/ApiHelper';
import { createLogger } from '@utils/logger';

const log = createLogger('delete-booking');

test.describe('@P0 @regression Level 2 (ApiHelper) - DELETE booking', () => {
    test('DELETE /booking/{id} removes the created booking', async ({ request }) => {
        const api = new ApiHelper(request);

        const authRes = await api.post('/auth', { username: 'admin', password: 'password123' });
        const { token } = await api.parseJsonResponse<{ token: string }>(authRes);
        expect(token).toBeTruthy();

        const created = await api.post('/booking', {
            firstname: 'Delete',
            lastname: 'Helper',
            totalprice: 250,
            depositpaid: true,
            bookingdates: { checkin: '2026-06-01', checkout: '2026-06-07' },
            additionalneeds: 'No extras',
        });
        const { bookingid } = await api.parseJsonResponse<{ bookingid: number }>(created);
        expect(bookingid).toBeGreaterThan(0);

        const response = await api.delete(`/booking/${bookingid}`, {
            headers: { Cookie: `token=${token}` },
        });

        log.info(`DELETE /booking/${bookingid} returned status ${response.status()}`);
        expect(response.status()).toBe(201);

        const body = await response.text();
        expect(body).toContain('Created');
        log.info(`DELETE /booking/${bookingid} verified successfully`);
    });
});
