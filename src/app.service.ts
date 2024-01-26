import { Injectable } from '@nestjs/common';
const { exec } = require("child_process");


@Injectable()
export class AppService {



  getHello(): string {
    return 'Hello World!';
  }

  async kickSSh(ip:string, user: string) {
    console.log("AppService -> kickSSh -> user", user)
    let isBlocked: boolean = false

   await exec(`sudo blockssh ${ip} ${user}`, (error, stdout, stderr) => {
      if (error) {
        return {
          status: 'failed',
          ip,
          user
        };
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        exec(`telegram-send "StdoutError: ${stderr}"`)

        return {
          status: 'failed-stdout',
          ip,
          user,
          stderr
        };
      }
      isBlocked = true
      
    });


    console.log("AppService -> exec -> isBlocked", isBlocked)

    // exec(`telegram-send "Error blocking the ${ip}"`)
    return {
      status: 'ok',
      ip,
      user
    };
  }
}
