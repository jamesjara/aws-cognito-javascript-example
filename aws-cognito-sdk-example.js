/* Global Variables */
var poolId = 'us-west-2_SLC7ee3jy';
var clientId = '6q6m87f49vj4oha71u8qgotdj9';
AWSCognito.config.region = 'us-west-2';
/* End Global Variables */

/* Use Case 1 */
function registerUser(userName, password, email, phoneNumber) {
    //This is required to derive the endpoint

    var poolData = {
        UserPoolId: poolId, // Your user pool id here
        ClientId: clientId // Your client id here
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: email
    };

    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: phoneNumber
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    // attributeList.push(attributePhoneNumber);

    userPool.signUp(userName, password, attributeList, null, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        loginUser(cognitoUser.getUsername(), 'password');
    });
};

//registerUser('james.jara' + Math.floor(Math.random() * 10000),'password','james.jara@gmail.com','+14257499211');


/* End Use Case 1 */

/* Use Case 2 */
function loginUser(userName, password) {

    var authenticationData = {
        Username: userName,
        Password: password,
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId: poolId, // Your user pool id here
        ClientId: clientId // Your client id here
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username: userName,
        Pool: userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
            console.log('idToken + ' + result.idToken.jwtToken);
        },

        onFailure: function(err) {
            alert(err);
        }

    });
};


loginUser('james.jara9099', 'password');
