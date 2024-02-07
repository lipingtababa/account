import {describe, expect} from '@jest/globals';
import axios from 'axios';

describe('account service', () => {
    test('Account service should be up and running', async() => {
        const apiUrl = "http://account-182883838.us-east-1.elb.amazonaws.com:80/ping";
        await axios.get(apiUrl)
          .then(r => {
            expect(r.data).toBeDefined();
            expect(r.status).toBe(200);
          })
          .catch(e => {
            expect(e).toBeNull();
          });
      });

      test('Customer-service service should be up and running', async() => {
        const apiUrl = "http://customer-846624933.us-east-1.elb.amazonaws.com:80//customer/contact";
        await axios.get(apiUrl)
          .then(r => {
            expect(r.data).toBeDefined();
            expect(r.status).toBe(200);
          })
          .catch(e => {
            expect(e).toBeNull();
          });
      });



    test('It should return 404 if no account', async() => {
        const apiUrl = "http://account-182883838.us-east-1.elb.amazonaws.com:80/account/overview/nonexistent";
        await axios.get(apiUrl)
          .then(r => {
            expect(r.data).toBeDefined();
            expect(r.status).toBe(404);
          })
          .catch(e => {
            expect(e).toBeNull();
          });
      });
});
