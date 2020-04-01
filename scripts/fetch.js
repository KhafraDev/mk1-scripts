/**
 * Very simple fetch-like function that transforms fetch arguments into cURL readable strings.
 * Will not re-define itself when it is called; only on the first run.
 * 
 * Copy and paste this into the file you wish to use it as, but not the example usage.
 * Request body can be sent by passing an argument using -d in o.opts[].
 */
var fetch = typeof fetch !== 'undefined' ? fetch : function(url, o={}, cb) {
    let c = ['curl'];
    
    if(o.method) {
        c.push('-X ' + o.method);
    }

    if(o.headers) {
        for(const [k, v] of Object.entries(o.headers)) {
            const h = '-H \"' + k + ': ' + v + '\"';
            c.push(h); 
        }
    }

    if(o.opts) {
        for(const opt of o.opts) {
            c.push(opt);
        }
    }

    c.push('\"' + url + '\"');
    console.log(c.join(' '));

    return shellrun(c.join(' '), (err, stdout) => cb(err, stdout));
}

// Example Request (what it looks like in cURL):
//  curl -X POST "https://httpbin.org/post" -H  "accept: application/json"
// How it looks like with fetch:
fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'accept': 'application/json'
    }
}, (err, stdout) => {
    if(err) {
        alert('error');
        console.error(err);
    } else {
        alert('RESULT!');
        console.log(JSON.parse(stdout));
    }
});