.pragma library

var defaultEndPoint = 'https://ssl.google-analytics.com/collect',
    debugEndPoint = 'https://www.google-analytics.com/debug/collect',
    __skipRequest = false,
    __endPoint = defaultEndPoint,
    __required  = {v: 1,  ds: 'app'},
    __params = {},
    __customMetrix = [];

function setEndpoint(value) {
    __endPoint = value;
}

function setSampling(value) {
    __skipRequest = value < Math.random();
    if (__skipRequest) {
        console.log('Google analytics reject all requests from this session due to sampling settings for this user');
    }
}

/**
 * The tracking ID / web property ID. The format is UA-XXXX-Y. All collected data is associated by this ID.
 *
 * Example value: UA-XXXX-Y
 */
function setTrackingId(value) {
    __required['tid'] = value;
}

/**
 * This anonymously identifies a particular user, device, or browser instance. For the web, this is generally stored
 * as a first-party cookie with a two-year expiration. For mobile apps, this is randomly generated for each particular
 * instance of an application install. The value of this field should be a random UUID (version 4) as described
 * in http://www.ietf.org/rfc/rfc4122.txt
 *
 * Example value: 35009a79-1a05-49d7-b876-2b884d0f825b
 */
function setClientId(value) {
    __required['cid'] = value;
}

/**
 * Screens in Google Analytics represent content users are viewing within your app. The equivalent concept in
 * web analytics is a pageview. Measuring screen views allows you to see which content is being viewed most by your
 * users, and how they are navigating between different pieces of content.
 */
function setScreenName(name) {
    __params['cd'] = name; //Screen name / content description.
}

/**
 * This is intended to be a known identifier for a user provided by the site owner/tracking library user. It may not
 * itself be PII (personally identifiable information). The value should never be persisted in GA cookies or other
 * Analytics provided storage.
 *
 * Example value: as8eknlll
 */
function setUserId(value) {
    __params['uid'] = value;
}

/**
 * When present, the IP address of the sender will be anonymized. For example, the IP will be anonymized if any of
 * the following parameters are present in the payload: &aip=, &aip=0, or &aip=1.
 *
 * Example value: 1
 */
function setAnonymizeIP(value) {
    __params['aip'] = value;
}

/**
 * The IP address of the user. This should be a valid IP address in IPv4 or IPv6 format. It will always be anonymized
 * just as though &aip (anonymize IP) had been used.
 *
 * Example value: 1.2.3.4
 */
function setIPOverride(value) {
    __params['uip'] = value;
}

/**
 * The User Agent of the browser. Note that Google has libraries to identify real user agents. Hand crafting your
 * own agent could break at any time.
 *
 * Example value: Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14
 */
function setUserAgent(value) {
    __params['ua'] = value;
}

/**
 * Specifies the application name. This field is required for all hit types sent to app properties. For hits sent
 * to web properties, this field is optional.
 *
 * Example value: My App
 */
function setApplicationName(value) {
    __params['an'] = value;
}

/**
 * Specifies the application version.
 *
 * Example value: 1.2
 */

function setApplicationVersion(value) {
    __params['av'] = value;
}

/**
 * Application identifier.
 *
 * Example value: com.company.app
 */
function setApplicationId(value) {
    __params['aid'] = value;
}

/**
 * Application installer identifier.
 *
 * Example value: com.platform.vending
 */
function setApplicationInstallerId(value) {
    __params['aiid'] = value;
}

/**
 * Specifies the screen resolution.
 *
 * Example value: 800x600
 */
function setScreenResolution(value) {
    __params['sr'] = value;
}

/**
 * Specifies the screen color depth.
 *
 * Example value: 24-bits
 */
function setScreenColors(value) {
    __params['sd'] = value;
}

/**
 * Specifies the viewable area of the browser / device.
 *
 * Example value: 123x456
 */
function setViewportSize(value) {
    __params['vp'] = value;
}

/**
 * Specifies the language.
 *
 * Example value: en-us
 */
function setUserLanguage(value){
    __params['ul'] = value;
}

/**
 * Specifies the character set used to encode the page / document / app.
 *
 * Example value: UTF-8
 */
function setEncoding(value) {
    __params['de'] = value;
}

function setOs(value) {
    __params['cd0'] = 'OS';
    __params['cm0'] = value;
}

/**
 * A session represents a single period of user interaction with your app. Sessions serve as useful containers of
 * measured activity, which includes screen views, events, and ecommerce transactions.
 *
 * By default, Google Analytics will group hits that are received within 30 minutes of one another into the same
 * session. This period is configurable at the property level.
 */
function startSession(callback) {
    request({sc: 'start', 'dp': '/'}, callback);
}

function endSession(callback){
    request({sc: 'end', 'dp': '/'}, callback);
}

/**
 * Set current screen and send view event.
 */
function trackScreen(name, callback) {
    setScreenName(name);

    var query = clone(__params);
    query.t = 'screenview';

    request(__params, callback);
}

/**
 * @param category Specifies the event category. Must not be empty.
 * @param action Specifies the event action. Must not be empty.
 * @param label Specifies the event label.
 * @param value Specifies the event value. Values must be non-negative.
 */
function trackEvent(category, action, label, value, callback) {
    var query = clone(__params);
    query.t = 'event';
    query.ec = category;
    query.ea = action;

    if (label) {
        query.el = label;
    }

    if (value) {
        query.ev = value;
    }

    request(query, callback);
}

/**
 * @param action Specifies the social interaction action. For example on Google Plus when a user clicks the +1 button,
                 the social action is 'plus'.
 * @param network Specifies the social network, for example Facebook or Google Plus.
 * @param target Specifies the target of a social interaction. This value is typically a URL but can be any text.
 */
function trackSocial(action, network, target, callback) {
    var query = clone(__params);
    query.t = 'social';
    query.sa = action;
    query.sn = network;
    query.st = target;

    request(query, callback);
}

/**
 * @param string description Specifies the description of an exception.
 * @param bool isFatal Specifies whether the exception was fatal.
 */
function trackException(description, isFatal, callback) {
    var query = clone(__params);
    query.t = 'exception';
    query.exd = description;
    query.exf = isFatal ? 1 : 0;

    request(query, callback);
}

function request(data, callback) {
    if (__skipRequest) {
        return;
    }

    var xhr = new XMLHttpRequest(),
        rawData = serialize(__required) + serialize(data) + ('z=' + Math.random());

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }

        var obj = {
            status: xhr.status,
            header: xhr.getAllResponseHeaders(),
            body: xhr.responseText
        };

        console.log(JSON.stringify(obj));
        if (callback) {
            callback(obj);
        }
    };

    xhr.open('POST',  __endPoint);
    xhr.send(rawData);
}

function serialize(obj) {
    var key,
        query = '';

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            query += (key + "=" + encodeURIComponent(obj[key]) + "&");
        }
    }

    return query;
}

function clone(obj) {
    var clone = {}, i;
    for (i in obj) {
        clone[i] = obj[i];
    }

    return clone;
}