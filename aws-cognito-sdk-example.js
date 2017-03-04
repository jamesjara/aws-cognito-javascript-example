
/* Global Variables */
var poolId = 'us-west-2_SLC7ee3jy';
var clientId = '6q6m87f49vj4oha71u8qgotdj9';
AWSCognito.config.region = 'us-west-2';
/* End Global Variables */ 

/* Use Case 1 */
function registerUser(userName,password,email,phoneNumber) {
 //This is required to derive the endpoint

    var poolData = { 
        UserPoolId : poolId, // Your user pool id here
        ClientId : clientId // Your client id here
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : phoneNumber
    };
    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
   // attributeList.push(attributePhoneNumber);

    userPool.signUp(userName, password, attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        document.getElementById("registerUserResults").innerHTML = 'user name is ' + cognitoUser.getUsername();
    });
};

document.getElementById("registerUserButton").onclick=function(){registerUser('james.jara' + Math.floor(Math.random() * 10000),'P@$$w0rd','emj.ellenjones@gmail.com','+14257499211')};
/* End Use Case 1 */
