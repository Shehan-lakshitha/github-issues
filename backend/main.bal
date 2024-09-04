import ballerina/http;

string githubApiURL = "https://api.github.com";

configurable string acessToken = ?;

http:Client githubClient = check new (githubApiURL, {
    auth: {
        token: acessToken
    }
});

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

}

type IssueInfo record {|
    int number;
    string title;
    string state;
    string body;
    string url;
|};
