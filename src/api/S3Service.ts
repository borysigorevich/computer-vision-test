const albumBucketName = 'dataspan.frontend-home-assignment';

// @ts-ignore
AWS.config.region = 'eu-central-1';
// @ts-ignore
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	IdentityPoolId: 'eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9',
});

// @ts-ignore
export const s3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: albumBucketName },
});
