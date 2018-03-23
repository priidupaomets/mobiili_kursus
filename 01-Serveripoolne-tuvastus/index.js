var express = require("express");
var browscap = require("browscap");  // https://github.com/dangrossman/node-browscap

var app = express();

browscap.setIni('./lite_php_browscap.ini');

app.get("/", function(req, res) { 
    //var ua = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; WinTSI 05.11.2009)";
    // ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36";
    // ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299";

    // ua = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko";
    // Browser: IE 11.0
    // Parent: IE 11.0 for Desktop
    // Platform: Win10
    // Device Type: undefined
    // isMobileDevice: false
    // isTablet: false

    // ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0";
    // Browser: Firefox 56.0
    // Parent: Firefox 56.0
    // Platform: Win10
    // Device Type: undefined
    // isMobileDevice: false
    // isTablet: false

    // ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D100 Safari/604.1";
    // Browser: Mobile Safari UIWebView 0.0
    // Parent: Mobile Safari UIWebView
    // Platform: iOS
    // Device Type: undefined
    // isMobileDevice: true
    // isTablet: false

    // ua = "Mozilla/5.0 (iPad; CPU OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D100 Safari/604.1";
    // Browser: Mobile Safari UIWebView 0.0
    // Parent: Mobile Safari UIWebView
    // Platform: iOS
    // Device Type: undefined
    // isMobileDevice: true
    // isTablet: true


    // Mozilla/5.0 (Linux; Android 5.1.1; Nexus 7 Build/LMY47V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.89 Safari/537.36
    // Browser: Default Browser 0.0
    // Parent: DefaultProperties
    // Platform: unknown
    // Device Type: undefined
    // isMobileDevice: false
    // isTablet: false

    // Mozilla/5.0 (Linux; Android 4.4.4; Amazon Otter Build/KTU84Q) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Safari/537.36
    // Browser: Default Browser 0.0
    // Parent: DefaultProperties
    // Platform: unknown
    // Device Type: undefined
    // isMobileDevice: false
    // isTablet: false

    // Mozilla/5.0 (SMART-TV; X11; Linux armv7l) AppleWebKit/537.42 (KHTML, like Gecko) Chromium/25.0.1349.2 Chrome/25.0.1349.2 Safari/537.42
    // Browser: Default Browser 0.0
    // Parent: DefaultProperties
    // Platform: unknown
    // Device Type: undefined
    // isMobileDevice: false
    // isTablet: false
    
    var ua = req.headers['user-agent'];

    var browser = browscap.getBrowser(ua);

    console.log(ua);
    console.log("Browser: " + browser['Browser'] + " " + browser['Version']);
    console.log('Parent: ' + browser['Parent']);
    console.log('Platform: ' + browser['Platform']);
    console.log('Device Type: ' + browser['Device Type']);
    console.log('isMobileDevice: ' + browser['isMobileDevice']);
    console.log('isTablet: ' + browser['isTablet']);

    res.send('<h1>Browscap</h1>' +
        '<h2>User-Agent: ' + ua + '</h2>' +
        '<h2>' + browser['Browser'] + " " + browser['Version'] + '<br>' +
        'isMobileDevice: ' + browser['isMobileDevice'] + '<br>' +
        'isTablet: ' + browser['isTablet'] + '</h2>');
}); 

// Vaikimisi vastus, kui muid teekondi ei leitud 
app.get('*', function(req, res) { 
    res.status(404).send('Invalid route'); 
});

// Initialize the server
var server = app.listen(3000, function() {
    console.log('Listening on port 3000');
});