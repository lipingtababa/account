# Fetch environment variables from ssm parameter store
# Fetch environment variables from secrets manager

if [ "$AWS_REGION"  != "localhost" ]; then
    # APP_NAME, APP_VERSION, STAGE, AWS_ACCOUNT and AWS_REGION are environment variables already
    DB_PASSWORD=`aws ssm get-parameters --names /${APP_NAME}/${STAGE}/db/password --with-decryption --region ${AWS_REGION} | jq -r '.Parameters[0].Value' | tr -d '\n'`
    DB_ENDPOINT=`aws ssm get-parameters --names /${APP_NAME}/${STAGE}/db/endpoint --region ${AWS_REGION} | jq -r '.Parameters[0].Value' | tr -d '\n'`
    DB_HOST=`echo ${DB_ENDPOINT} | cut -d: -f1`
    DB_PORT=`echo ${DB_ENDPOINT} | cut -d: -f2`

    export DB_PASSWORD=${DB_PASSWORD}
    export DB_HOST=${DB_HOST}
    export DB_PORT=${DB_PORT}

    echo "DB_HOST=${DB_HOST}"
    echo "DB_PORT=${DB_PORT}"

fi

# start index.js
node --trace-warnings dist/index.ts
