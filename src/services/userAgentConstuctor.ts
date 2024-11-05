import {
    GenerateUserAgentOptions,
    UserAgentOS,
    UserAgentBrowser,
    UserAgentDevice,
} from '../helpers/types';

var chromeWebkitVersions = {
    "1.0": "528",
    "2.0": "530",
    "3.0": "532",
    "4.0": "532.5",
    "4.1": "49",
    "5.0": "533",
    "6.0": "534.3",
    "7.0": "534.7",
    "8.0": "534.1",
    "9.0": "534.13",
    "10.0": "534.16",
    "11.0": "534.24",
    "12.0": "534.3",
    "13.0": "535.1",
    "14.0": "535.2",
    "15.0": "535.2",
    "16.0": "535.7",
    "17.0": "535.11",
    "18.0": "535.19",
    "19.0": "536.5",
    "20.0": "536.1",
    "21.0": "537.1",
    "22.0": "537.4",
    "23.0": "537.11",
    "24.0": "537.17",
    "25.0": "537.22",
    "26.0": "537.31",
    "27.0": "537.36"
  };
  var androidWebkitVersions = {
    "1.5": "528.5",
    "1.6": "528.5",
    "2.0": "530.17",
    "2.0.1": "530.17",
    "2.1": "530.17",
    "2.2": "533.1",
    "2.3": "?",
    "2.3.3": "533.1",
    "3.0": "534.13",
    "3.1": "534.13",
    "3.2": "534.13",
    "4.0": "534.30",
    "4.0.3": "534.30",
    "4.1": "534.30",
    "4.2": "534.30",
    "4.3": "534.30",
    "4.4": "537.36"
  };

  var safariWebkitVersions = {
    "1.0": "85",
    "1.0.3": "85.8.5",
    "1.1": "100",
    "1.2": "125",
    "1.3": "312",
    "1.3.1": "312.3",
    "1.3.2": "312.5",
    "1.3.3": "312.6",
    "2.0": "412",
    "2.0.2": "416.11",
    "2.0.4": "419.3",
    "3.0": "522.11",
    "3.0.2": "522.12",
    "3.0.3": "522.12.1",
    "3.0.4": "523.10",
    "3.1": "525.13",
    "3.1.1": "525.20",
    "3.1.2": "525.21",
    "3.2": "525.26",
    "3.2.1": "525.27",
    "3.2.3": "525.28",
    "4.0": "530.17",
    "4.0.1": "530.18",
    "4.0.2": "530.19",
    "4.0.3": "531.9",
    "4.0.4": "531.21.10",
    "4.0.5": "531.22.7",
    "4.1": "533.16",
    "4.1.1": "533.17.8",
    "4.1.2": "533.18.5",
    "4.1.3": "533.19.4",
    "5.0": "533.16",
    "5.0.1": "533.17.8",
    "5.0.2": "533.18.5",
    "5.0.3": "533.19.4",
    "5.0.4": "533.20.27",
    "5.0.5": "533.21.1",
    "5.0.6": "533.22.3",
    "5.1": "534.48.3",
    "5.1.1": "534.51.22",
    "5.1.2": "534.52.7",
    "5.1.3": "534.53.10",
    "5.1.4": "534.54.16",
    "5.1.5": "534.55.3",
    "5.1.6": "534.56.5",
    "5.1.7": "534.57.2",
    "5.1.8": "534.58.2",
    "5.1.9": "534.59.8",
    "5.1.10": "534.59.10",
    "6.0": "536.25",
    "6.0.1": "536.26",
    "6.0.2": "536.26.17",
    "6.0.3": "536.28.10",
    "6.0.4": "536.29.13",
    "6.0.5": "536.30.1",
    "6.1": "537.43.58",
    "6.1.1": "537.73.11",
    "6.1.6": "537.78.2[24]",
    "6.2.8": "537.85.17",
    "7.0": "537.71",
    "7.0.1": "537.73.11",
    "7.0.3": "537.75.14",
    "7.0.4": "537.76.4",
    "7.0.5": "537.77.4",
    "7.0.6": "537.78.2",
    "7.1.8": "537.85.17",
    "8.0": "538.35.8",
    "8.0.6": "600.6.3",
    "8.0.7": "600.7.12",
    "9.0": "601.1.56",
    "9.0.1": "601.2.7",
    "9.0.2": "601.3.9",
    "9.0.3": "601.4.4",
    "9.1": "601.5.17",
    "9.1.1": "601.6.17",
    "9.1.2": "601.7.1",
    "9.1.3": "601.7.8",
    "10.0": "602.1.50",
    "10.0.1": "602.2.14",
    "10.0.2": "602.3.12",
    "10.0.3": "602.4.8",
    "10.1": "603.1.30",
    "10.1.1": "603.2.4",
    "10.1.2": "603.3.8",
    "11.0.0": "604.1.28"
  };
  
  function getRandomVersion(versions: Record<string, string>) {
    var availableVersions = Object.keys(versions);
    var randomIndex = Math.floor(Math.random() * availableVersions.length);
    return versions[availableVersions[randomIndex]];
  };
  

  function generateChrome(version?:string, os?:string, device?:string) {
    return `Mozilla/5.0 (${os}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version ?? '537.36'} Safari/537.36`;
  }
  function generateFirefox(version?:string, os?:string, device?:string) {
    return `Mozilla/5.0 (${os}; rv:${version ?? '537.36'}) Gecko/20100101 Firefox/${version ?? '537.36'}`;
  }
  function generateSafari(version?:string, os?:string, device?:string) {
    return `Mozilla/5.0 (${os}) AppleWebKit/${version ?? '604.1.28'} (KHTML, like Gecko) Version/${version ?? '604.1.28'} Safari/${version ?? '604.1.28'}`;
  }
  function generateAndroid(version?:string, device?:string, buildVersion?:string) {
    return `Mozilla/5.0 (Linux; Android ${version ?? '537.36'}; ${device} Build/${buildVersion ?? '537.36'};) AppleWebKit/${version ?? '537.36'} (KHTML, like Gecko) Version/4.0 Chrome/${version ?? '537.36'} Mobile Safari/${version ?? '537.36'}`;
  }
  function generateEdge(version?:string, os?:string, device?:string) {
    return `Mozilla/5.0 (${os};) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version} Safari/537.36 Edge/${version}`;
  }


/**
 * @description Parse the type of the operating system.
 * @param {string} type - The type of the operating system.
 * @returns {string} The parsed type of the operating system.
 * @example parseType('Win') => 'Windows'
 * @example parseType('Mac') => 'Mac OS'
 * @example parseType('Linux') => 'Linux'
 * @example parseType('android') => 'Android'
 * @example parseType('IOS') => 'iOS'
 * @export parseType
 */
function parseOS(type: string): UserAgentOS {
    type = type.toLocaleLowerCase();
    return type.startsWith('mac') ? 'Mac OS' : 
        type.startsWith('windows') || type.startsWith('win') ? 'Windows' : 
        type.startsWith('linux') ? 'Linux' : 
        type.startsWith('android') ? 'Android' : 
        type.startsWith('ios') || type.startsWith('ıos') ? 'iOS' : 'Windows';
};


export default class UserAgent {
    constructor() {

    };

    static getVersion(os?: UserAgentOS): string {
        if (!os) os = this.getOS();

        switch (os) {
            case 'Windows':
                return getRandomVersion(chromeWebkitVersions);
            case 'Mac OS':
                return getRandomVersion(safariWebkitVersions);
            case 'Linux':
                return getRandomVersion(chromeWebkitVersions);
            case 'Android':
                return getRandomVersion(androidWebkitVersions);
            case 'iOS':
                return getRandomVersion(safariWebkitVersions);
            default:
                return getRandomVersion(chromeWebkitVersions);
        };
    };

    static getOS(): UserAgentOS {
        var OSList: UserAgentOS[] = ['Windows', 'Mac OS', 'Linux', 'Android', 'iOS'];
        return OSList[Math.floor(Math.random() * OSList.length)];
    };

    static getBrowser(): UserAgentBrowser {
        var BrowserList: UserAgentBrowser[] = ['Chrome', 'Firefox', 'Safari', 'Opera', 'Edge'];
        return BrowserList[Math.floor(Math.random() * BrowserList.length)];
    };

    static getDevice(): UserAgentDevice {
        var DeviceList: UserAgentDevice[] = [
            'SM-T210', 'SM-G900F', 'SM-G920F', 'SM-G930F', 'SM-G950F', 'SM-G960F', 'SM-G970F', 'SM-G973F', 'SM-G975F', 'SM-G980F', 'SM-G985F', 'SM-G988B', 'SM-N9005', 'SM-N910F', 'SM-N920C', 'SM-N950F', 'SM-N960F', 'SM-N970F', 'SM-N975F', 'SM-N980F', 'SM-N985F', 'SM-N986B', 'iPhone', 'iPad', 'iPod touch', 'Nexus 5', 'Nexus 7', 'Nexus 10', 'Nexus 4', 'Nexus 6', 'Nexus 9', 'Nexus 5X', 'Nexus 6P', 'Nexus 7 (2013)', 'Nexus 9 (2014)', 'Nexus 10 (2012)', 'Nexus 4 (2012)', 'Nexus 6 (2014)', 'Nexus 5X (2015)', 'Nexus 6P (2015)', 'Mi 9', 'Mi 9 SE', 'Mi 9T', 'Mi 9T Pro', 'Mi 10', 'Mi 10 Pro', 'Mi 10T', 'Mi 10T Pro', 'Mi 11', 'Mi 11 Lite', 'Mi 11 Ultra', 'Redmi Note 8', 'Redmi Note 8 Pro', 'Redmi Note 9', 'Redmi Note 9 Pro', 'Redmi Note 10', 'Redmi Note 10 Pro', 'Redmi Note 11', 'Redmi Note 11 Pro', 'Poco F1', 'Poco F2 Pro', 'Poco X3', 'Poco X3 Pro', 'Poco M3'
        ];
        return DeviceList[Math.floor(Math.random() * DeviceList.length)];
    };  



    static generate(options?: GenerateUserAgentOptions): string {
        var UserAgentOptions = {} as GenerateUserAgentOptions;

        if(!options) {
            UserAgentOptions = {
                os: this.getOS(),
                browser: this.getBrowser(),
                device: this.getDevice(),
                version: this.getVersion('Windows')
            };
        } else {
            var defaultBrowserList = ['Chrome', 'Firefox', 'Opera', 'Edge'];
            var OS = parseOS(options.os || 'Windows');
            var browser = OS == 'iOS' || OS == 'Mac OS' ? 'Safari' : defaultBrowserList[Math.floor(Math.random() * defaultBrowserList.length)] as UserAgentBrowser;
            var version = options.version || this.getVersion(OS || 'Windows');

            UserAgentOptions = {
                os: parseOS(options?.os || 'Windows') || this.getOS(),
                browser: options?.browser || browser,
                device: options?.device || this.getDevice(),
                version: version
            };
        };

        var os = UserAgentOptions.os;
        var parsedOS = os == 'Windows' ?
        [
            'Windows NT 6.1; Win64; x64',
            'Windows NT 10.0; Win64; x64',
            'Windows NT 6.3; Win64; x64',
            'Windows NT 6.1; WOW64',
            'Windows NT 10.0',
            'Windows NT 5.1'
        ] :
        os == 'Mac OS' ? 
        [
            'Macintosh; Intel Mac OS X 10_10_5',
            'Macintosh; Intel Mac OS X 10_12_2',
            'Macintosh; Intel Mac OS X 10_12_3',
            'Macintosh; Intel Mac OS X 10_9_5',
            'Macintosh; Intel Mac OS X 10_12_0',
            'Macintosh; Intel Mac OS X 10_12_1',
            'Macintosh; Intel Mac OS X 10_11_6'
        ] :
        os == 'Linux' ? 
        [
            'X11; Ubuntu; Linux x86_64; rv:53.0',
            'X11; Linux x86_64',
            'X11; Linux x86_64; rv:53.0',
            'X11; Linux x86_64; rv:52.0'
        ] : 
        os == 'Android' ? 
        [
            `Linux; Android 4.2.2; ${UserAgentOptions.device}`,
            `Linux; Android 4.4; ${UserAgentOptions.device}`,
            `Linux; Android 5.0; ${UserAgentOptions.device}`,
            `Linux; Android 5.1; ${UserAgentOptions.device}`,
            `Linux; Android 6.0; ${UserAgentOptions.device}`,
            `Linux; Android 7.0; ${UserAgentOptions.device}`,
            `Linux; Android 7.1; ${UserAgentOptions.device}`,
            `Linux; Android 8.0; ${UserAgentOptions.device}`,
            `Linux; Android 9.0; ${UserAgentOptions.device}`,
            `Linux; Android 10.0; ${UserAgentOptions.device}`,
            `Linux; Android 11.0; ${UserAgentOptions.device}`,
            `Linux; Android 12.0; ${UserAgentOptions.device}`
        ]
        :
        os == 'iOS' ? 
        [
            `iPad; CPU OS 10_3_2 like Mac OS X`,
            `iPhone; CPU OS 10_3_2 like Mac OS X`,
            `iPod touch; CPU OS 10_3_2 like Mac OS X`,
            `iPad; CPU OS 11_0 like Mac OS X`,
            `iPhone; CPU OS 11_0 like Mac OS X`,
            `iPod touch; CPU OS 11_0 like Mac OS X`,
            `iPad; CPU OS 12_0 like Mac OS X`,
            `iPhone; CPU OS 12_0 like Mac OS X`,
            `iPod touch; CPU OS 12_0 like Mac OS X`,
            `iPad; CPU OS 13_0 like Mac OS X`,
            `iPhone; CPU OS 13_0 like Mac OS X`,
        ] : 
        [
            'Windows NT 6.1; Win64; x64',
            'Windows NT 10.0; Win64; x64',
            'Windows NT 6.3; Win64; x64',
            'Windows NT 6.1; WOW64',
            'Windows NT 10.0',
            'Windows NT 5.1',
            'Macintosh; Intel Mac OS X 10_10_5',
            'Macintosh; Intel Mac OS X 10_12_2',
            'Macintosh; Intel Mac OS X 10_12_3',
            'Macintosh; Intel Mac OS X 10_9_5',
            'Macintosh; Intel Mac OS X 10_12_0',
            'Macintosh; Intel Mac OS X 10_12_1',
            'Macintosh; Intel Mac OS X 10_11_6',
            'X11; Ubuntu; Linux x86_64; rv:53.0',
            'X11; Linux x86_64',
            'X11; Linux x86_64; rv:53.0',
            'X11; Linux x86_64; rv:52.0',
            `Linux; Android 4.2.2; ${UserAgentOptions.device}`,
            `Linux; Android 4.4; ${UserAgentOptions.device}`,
            `Linux; Android 5.0; ${UserAgentOptions.device}`,
            `Linux; Android 5.1; ${UserAgentOptions.device}`,
            `Linux; Android 6.0; ${UserAgentOptions.device}`,
            `Linux; Android 7.0; ${UserAgentOptions.device}`,
            `Linux; Android 7.1; ${UserAgentOptions.device}`,
            `Linux; Android 8.0; ${UserAgentOptions.device}`,
            `Linux; Android 9.0; ${UserAgentOptions.device}`,
            `Linux; Android 10.0; ${UserAgentOptions.device}`,
            `Linux; Android 11.0; ${UserAgentOptions.device}`,
            `Linux; Android 12.0; ${UserAgentOptions.device}`,
            `iPad; CPU OS 10_3_2 like Mac OS X`,
            `iPhone; CPU OS 10_3_2 like Mac OS X`,
            `iPod touch; CPU OS 10_3_2 like Mac OS X`,
            `iPad; CPU OS 11_0 like Mac OS X`,
            `iPhone; CPU OS 11_0 like Mac OS X`,
            `iPod touch; CPU OS 11_0 like Mac OS X`,
            `iPad; CPU OS 12_0 like Mac OS X`,
            `iPhone; CPU OS 12_0 like Mac OS X`,
            `iPod touch; CPU OS 12_0 like Mac OS X`,
            `iPad; CPU OS 13_0 like Mac OS X`,
            `iPhone; CPU OS 13_0 like Mac OS X`,
        ];

        var getOS = parsedOS[Math.floor(Math.random() * parsedOS.length)];

        var UserAgent = '';
        if(UserAgentOptions.browser == 'Chrome') {
            UserAgent = generateChrome(UserAgentOptions.version, getOS, UserAgentOptions.device);
        } else if(UserAgentOptions.browser == 'Firefox') {
            UserAgent = generateFirefox(UserAgentOptions.version, getOS, UserAgentOptions.device);
        } else if(UserAgentOptions.browser == 'Safari') {
            UserAgent = generateSafari(UserAgentOptions.version, getOS, UserAgentOptions.device);
        } else if(UserAgentOptions.os == 'Android') {
            UserAgent = generateAndroid(UserAgentOptions.version, getOS, UserAgentOptions.version);
        } else if(UserAgentOptions.browser == 'Edge') {
            UserAgent = generateEdge(UserAgentOptions.version, getOS, UserAgentOptions.device);
        } else if(UserAgentOptions.browser == 'Opera') {
            UserAgent = generateChrome(UserAgentOptions.version, getOS, UserAgentOptions.device);
        };
        

        return UserAgent;
    };


};


export {
    GenerateUserAgentOptions,
    UserAgentOS,
    UserAgentBrowser,
    UserAgentDevice,
    chromeWebkitVersions as ChromeVersions,
    androidWebkitVersions as AndroidVersions,
    safariWebkitVersions as SafariVersions,
    getRandomVersion,
    generateChrome,
    generateFirefox,
    generateSafari,
    generateAndroid,
    generateEdge
};