import {describe, expect} from '@jest/globals';
import axios from 'axios';
import { logger } from '../../src/utils.js';

describe('account service', () => {
    test('Account service should be up and running', async() => {
        const apiUrl = "http://account-182883838.us-east-1.elb.amazonaws.com:80/ping";
        await axios.get(apiUrl)
          .then(r => {
            expect(r.data).toBeDefined();
            expect(r.status).toBe(200);
          })
          .catch(e => {
            logger.error(e);
            expect(e).toBeNull();
          });
      });

      test('It should return 404 if no account', async() => {
        const apiUrl = "http://account-182883838.us-east-1.elb.amazonaws.com:80/account/overview/nonexistent";
        await axios.get(apiUrl).catch(e => {
            logger.error(e);
            expect(e.response.status).toBe(404);
          });
      });
});


describe('customer-service service', () => {
  const domain = "http://customer-846624933.us-east-1.elb.amazonaws.com:80";
  
  test('Customer-service service should provide a static page', async() => {
    const apiUrl = domain + "/customer/contact_page";
    await axios.get(apiUrl)
      .then(r => {
        expect(r.data).toBeDefined();
        expect(r.status).toBe(200);
      })
      .catch(e => {
        logger.error(e);
        expect(e).toBeNull();
      });
  });

  test('Customer-service service should accept a form', async() => {
    const apiUrl = domain + "/customer/contact";
    await axios.post(apiUrl, {contact: "test", message: "test"})
      .then(r => {
        expect(r.data).toBeDefined();
        expect(r.status).toBe(200);
      })
      .catch(e => {
        logger.error(e);
        expect(e).toBeNull();
      });
});
});
