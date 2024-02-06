
import { CARD_IMAGE_BUCKET_NAME } from './constants.js';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();

export function presignCardImage(cardImagePath: string): string {
    const params = {
        Bucket: CARD_IMAGE_BUCKET_NAME,
        Key: cardImagePath,
        Expires: 60 * 10
    };
    return s3.getSignedUrl('getObject', params);
}
