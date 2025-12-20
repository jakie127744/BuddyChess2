const https = require('https');

const leagueId = '79559586';
const rawS2 = 'AECn7jqGDIjUmk%2BVJye6lchK2LAR0d2%2B8hd%2BJC8gi%2BfQ0YljrlmvoTFKEnMqh6EehOOs2WtPCVC5%2Fz68u7rUcEbDqUi%2F%2FjbKyp%2FBR5tEJtM%2B8TT6MKSknwRdQ7LUSqByhq4hDjyUCA2q8YHhHQ9qCLNT2Y3Zk0tcbFSx7tE9VEK4FRPnmKrEy10wECN42XQiSdZ%2BlzOcJfQ0xyF6ahKOweSx1qCVYKeLbGy%2FeupOMEfyzzuKpf3zNlDut87lyYwx0RVddnHjvrJXGqmhY48BarcwDjpnDoH234aHAXwBiww0tHylufjfSbjtfG%2FfF8SdC%2BA%2BTN2MbJBxRVArvdOaquYc';
const swid = '{491B908C-C4F9-4950-9B90-8CC4F9A950EC}';

// Try RAW (Undecoded)
const cookieVal = `swid=${swid}; espn_s2=${rawS2};`; 

console.log("Testing with RAW s2 and Season 2026...");

const options = {
  hostname: 'fantasy.espn.com',
  path: `/apis/v3/games/fba/seasons/2026/segments/0/leagues/${leagueId}?view=mTeam`,
  method: 'GET',
  headers: {
    'Cookie': cookieVal,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 302) {
      console.log("Redirect To:", res.headers.location);
  }
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200) {
        console.log("SUCCESS! Found League:", JSON.parse(data).id);
    } else {
        console.log("FAILED. Response start:", data.substring(0, 200));
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
