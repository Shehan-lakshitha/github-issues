import ballerina/http;
import ballerina/log;
import ballerina/io;

string githubApiURL = "https://api.github.com";

configurable string acessToken = ?;

http:Client githubClient = check new(githubApiURL, {
    auth:{
        token: acessToken
    }
});

configurable string owner = ?;
configurable string repo = ?;

public function main() returns error? {

    string endpoint = "/repos/" + owner + "/" + repo + "/issues";

    http:Response response = check githubClient->get(endpoint);

    if (response.statusCode == 200) {
        json issues = check response.getJsonPayload();

        //io:println("Issues:" + issues.toString());
        foreach var issue in <json[]>issues {
            int number = check issue.number;
            string title = (check issue.title).toString();
            string state = (check issue.state).toString();
            string body = (check issue.body).toString();
            string url = (check issue.url).toString();

            io:println("Issue:" , number);
            io:println("Title:" + title);
            io:println("State:" + state);
            io:println("Body:" + body);
            io:println("URL:" + url);
            io:println("-------------------------------------------------");

            // IssueInfo issueInfo = {
            //     number: check issue.number,
            //     title: (check issue.title).toString(),
            //     state: (check issue.state).toString(),
            //     body: (check issue.body).toString(),
            //     url: (check issue.url).toString()
            // };

            // io:println("Issue:" , issueInfo);
        }
    } else {
        log:printError("Error: " + response.reasonPhrase);
    }
    
}

type IssueInfo record {|
    int number;
    string title;
    string state;
    string body;
    string url;
|};