import { APIRequestContext, APIResponse } from '@playwright/test';

export interface BookingDates {
    checkin: string;
    checkout: string;
}

export interface Booking {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds?: string;
}

export interface CreateBookingResponse {
    bookingid: number;
    booking: Booking;
}

export interface AuthResponse {
    token: string;
}

export class RestfulBookerApi {
    public constructor(private readonly request: APIRequestContext) {}

    public async authenticate(
        username = process.env.RESTFUL_BOOKER_USERNAME ?? 'admin',
        password = process.env.RESTFUL_BOOKER_PASSWORD ?? 'password123',
    ): Promise<string> {
        const response = await this.request.post('/auth', {
            data: { username, password },
        });
        this.expectStatus(response, 200);
        const data = (await response.json()) as AuthResponse;
        return data.token;
    }

    public async createBooking(booking: Booking): Promise<APIResponse> {
        return this.request.post('/booking', { data: booking });
    }

    public async getBooking(bookingId: number): Promise<APIResponse> {
        return this.request.get(`/booking/${bookingId}`);
    }

    public async updateBooking(
        bookingId: number,
        booking: Booking,
        token: string,
    ): Promise<APIResponse> {
        return this.request.put(`/booking/${bookingId}`, {
            data: booking,
            headers: this.authHeaders(token),
        });
    }

    public async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
        return this.request.delete(`/booking/${bookingId}`, {
            headers: this.authHeaders(token),
        });
    }

    private authHeaders(token: string): Record<string, string> {
        return {
            Cookie: `token=${token}`,
        };
    }

    private expectStatus(response: APIResponse, expectedStatus: number): void {
        if (response.status() !== expectedStatus) {
            throw new Error(
                `Expected HTTP ${expectedStatus}, received ${response.status()}: ${response.url()}`,
            );
        }
    }
}
