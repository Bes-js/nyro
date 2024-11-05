

export default async function checkVersion(client:any, version:string, checkUpdates:boolean): Promise<void> {
    if(!checkUpdates) return;
    try {
        var { body } = await client.get(
            `https://registry.npmjs.com/-/v1/search?text=nyro`,
            { responseType: 'json', defaultMode: true }
        );

        var latestVersion = body.objects[0].package.version as string;
        if(version.split('.')[0] !== latestVersion.split('.')[0]) {
            console.log(
                `\r\n\r\n`,
                `\x1b[95;5;5m
                  =--------                                                                         
                 =----------- ====-                                                                 
                =====--------=======     :::::     :::.                                             
               =======+------=======     ::...:    .::::.:      ::. :..  .:.   .::::                
               ------=**=----=+++++=     ::.:...:  :...:.::    :..: :..::.:: :.......:              
               -------***+---=++++++     ::.:::::: :.:. :.::  :.::  :..::  .:.::   ::.::            
               -------*****--=++++++     ::.:  ::.::.:.  :... :.::  :.:.   :.::     ::.:            
               -------******==*****+     ::.:   ::...::  ::.::.:.   :..:   .:.:     ::.:            
               :::::::**************     ::.:     ::.::   .:..::    :..:    :.::::::.::             
               :::::::+*************     .:::      :::     :..:     :..       :::::::               
                :::::: ***********                        :..:                                      
                          ******                         ::::\x1b[0m`,
                `\r\n\r\n`,
                `\x1b[31;1;4m You are using an outdated version of\x1b[0m`,
                `\x1b[38;5;4m Nyro.\x1b[0m \r\n`,
                `\x1b[31;1;4m Please update to the latest version\x1b[0m`,
                `\x1b[38;5;119m (${latestVersion})\x1b[0m`,
                `\x1b[31;1;4m by running \x1b[0m`,
                `\x1b[38;5;119m ' npm install nyro@latest '\x1b[0m`,
                `\r\n\r\n`
            );
        }
    } catch (error) { };
};