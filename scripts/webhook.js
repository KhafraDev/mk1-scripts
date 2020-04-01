var webhookURL = typeof webhookURL === 'undefined' 
    ? undefined // REPLACE WITH WEBHOOK URL! 
    : webhookURL;

var fetch = typeof fetch !== 'undefined' ? fetch : function(url, o={}, cb) {
    let c = ['curl'];
    
    if(o.method) { c.push('-X ' + o.method); }
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

var embed = typeof embed !== 'undefined' ? embed : [{
    title: NOTIFICATION_TITLE,
    description: NOTIFICATION_MESSAGE,
    color: 2550200,
    timestamp: new Date(),
    author: {
        'name': 'Khafra',
        'icon_url': 'https://cdn.discordapp.com/avatars/267774648622645249/e03217cd10c97eebd7cb7b2f2a943cb1.png'
    }
}];

if(webhookURL) {
    fetch(webhookURL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        opts: [
            '-d \'' + JSON.stringify({ embeds: embed }) + '\''
        ]
    }, () => {});
}