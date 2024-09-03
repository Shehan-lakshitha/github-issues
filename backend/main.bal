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

        io:println("Issues:" + issues.toString());
        // foreach var issue in <json[]>issues {
        //     string title = (check issue.title).toString();
        //     string state = (check issue.state).toString();
        //     string url = (check issue.url).toString();

        //     log:printInfo("Issue Title:" + title);
        //     log:printInfo("Issue State:" + state);
        //     log:printInfo("Issue URL:" + url);
        //     log:printInfo("-------------------------------------------------");
        // }
    } else {
        log:printError("Error: " + response.reasonPhrase);
    }
    
}