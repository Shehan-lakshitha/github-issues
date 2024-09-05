import ballerina/http;

string githubApiURL = "https://api.github.com";

configurable string acessToken = ?;



http:Client githubClient = check new (githubApiURL, {
    auth: {
        token: acessToken
    }
});

@http:ServiceConfig{
    cors: {
        allowOrigins: ["http://localhost:5173"],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Authorization", "Content-Type"]
    }
}

// configurable string owner = ?;
// configurable string repo = ?;

service on new http:Listener(9090) {

    resource function get issues(http:Caller caller, http:Request request) returns error? {

        string owner = request.getQueryParamValue("owner") ?: "";
        string repo = request.getQueryParamValue("repo") ?: "";

        if (owner == "" || repo == "") {
            check caller->respond("owner and repo query parameters are required");
            return;

        }

        string endpoint = "/repos/" + owner + "/" + repo + "/issues";

        http:Response response = check githubClient->get(endpoint);

        if (response.statusCode == 200) {
            json issues = check response.getJsonPayload();

            IssueInfo[] issueInfos = [];
            foreach var issue in <json[]>issues {

                IssueInfo issueInfo = {
                    number: check issue.number,
                    title: (check issue.title).toString(),
                    state: (check issue.state).toString(),
                    body: (check issue.body).toString(),
                    url: (check issue.url).toString()
                };

                issueInfos.push(issueInfo);

            }

            check caller->respond(issueInfos);
        }
    }

    resource function get userInfo(http:Caller caller) returns error? {
        string endpoint = "/user";

        http:Response|http:ClientError response = githubClient->get(endpoint);

        
        if (response is http:Response) {
            json user = check response.getJsonPayload();

            UserInfo userInfo = {
                username: (check user.login).toString(),
                avatarUrl: (check user.avatar_url).toString()
            };

            check caller->respond(userInfo);
        } else {
            check caller->respond("Error occurred while getting user info");
        }

    }

}

type IssueInfo record {|
    int number;
    string title;
    string state;
    string body;
    string url;
|};

type UserInfo record {|
    string username;
    string avatarUrl;
|};
