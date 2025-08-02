import { test, expect } from '@playwright/test';
import bookingAPIRequestBody from '../../test-api-data/post_request_body.json';
import devConfig from '../../config/env.development';

// This is a repeat test from the previous pw-booker-api-test but imports the JSON from test-api-data folder in root and
// uses the JSON file for the payload.

// This example test checks the RESTful 'http://restful-booker.herokuapp.com' /booking API for basic functionality
// Run tests using Chrome - npx playwright test tests/pw-booker-api-json-test.spec.ts --project='chromium'
// Run tests with all configured browsers - npx playwright test tests/pw-booker-api-json-test.spec.ts
// Or use the Playwright Test Runner

test.describe('@api RESTful Booker API', () => {
  test('Creates POST api request /booking with json object request body', async ({
    request,
  }) => {
    const postAPIResponse = await request.post(`${devConfig.API_URL}/booking`, {
      data: bookingAPIRequestBody,
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
