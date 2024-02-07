import {describe, expect} from '@jest/globals';
import axios from 'axios';
import { logger } from '../../src/utils.js';

describe('account service', () => {
  const domain = "http://account-182883838.us-east-1.elb.amazonaws.com:80";

  test('Account service should be up and running', async() => {
    const apiUrl = domain+"/ping";
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
    const apiUrl = domain+"/account/overview/nonexistent";
    await axios.get(apiUrl).catch(e => {
        logger.error(e);
        expect(e.response.status).toBe(404);
      });
  });

  test('Account service should return correct account overview', async() => {
    const apiUrl = domain+"/account/overview/acc1";
    await axios.get(apiUrl)
      .then(r => {
        expect(r.data).toBeDefined();
        expect(r.status).toBe(200);
        expect(r.data.data).toBeDefined();
        const realData = r.data.data;

        expect(realData.account_id).toBe("acc1");
        expect(realData.transaction_collection).toBeDefined();
        expect(realData.transaction_collection.transactions).toBeDefined();
        expect(realData.transaction_collection.transactions.length).toBeGreaterThan(0);
        expect(realData.cards.length).toBe(0);
        expect(realData.invoices.length).toBe(0);
      })
      .catch(e => {
        logger.error(e);
        expect(e).toBeNull();
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
