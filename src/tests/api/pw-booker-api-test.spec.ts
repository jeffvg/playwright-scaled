import { test, expect } from '@playwright/test';
import devConfig from '../../config/env.development';

// This example test checks the RESTful 'http://restful-booker.herokuapp.com' /booking API for basic functionality
// Run tests using Chrome - npx playwright test tests/pw-booker-api-test.spec.ts --project='chromium'
// Run tests with all configured browsers - npx playwright test tests/pw-booker-api-test.spec.ts
// Or use the Playwright Test Runner

test.describe('@api RESTful Booker API', () => {
  test('GET /booking should return a list of bookings', async ({ request }) => {
    const response = await request.get(`${devConfig.API_URL}/booking`);
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    console.log('Bookings:', bookings);
    expect(Array.isArray(bookings)).toBe(true);
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings[0]).toHaveProperty('bookingid');
  });

  test('Creates POST api request /booking with static request body', async ({
    request,
  }) => {
    const postAPIResponse = await request.post(`${devConfig.API_URL}/booking`, {
      data: {
        firstname: 'John',
        lastname: 'Jones',
        totalprice: 1234,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-01-01',
          checkout: '2025-05-01',
        },
        additionalneeds: 'Parks', // "additionalneeds" is an optional string value for extra requirements
      },
    });
    const postAPIResponseBody = await postAPIResponse.json();
    console.log(postAPIResponseBody);
    // Validate the response status
    expect(postAPIResponse.ok()).toBeTruthy();
    expect(postAPIResponse.status()).toBe(200);
    // Validate the response body JSON objects
    expect(postAPIResponseBody).toHaveProperty('bookingid');
    expect(postAPIResponseBody.booking.firstname).toBe('John');
    expect(postAPIResponseBody.booking.lastname).toBe('Jones');
    expect(postAPIResponseBody.booking.totalprice).toBe(1234);
    expect(postAPIResponseBody.booking.depositpaid).toBe(true);
    expect(postAPIResponseBody.booking.additionalneeds).toBe('Parks');
    // Validate the nested body response JSON objects
    expect(postAPIResponseBody.booking.bookingdates.checkin).toBe('2025-01-01');
    expect(postAPIResponseBody.booking.bookingdates.checkout).toBe(
      '2025-05-01',
    );
  });
});
