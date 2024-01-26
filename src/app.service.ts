import { Injectable } from '@nestjs/common';
const { exec } = require("child_process");


@Injectable()
export class AppService {



  getHello(): string {
    return 'Hello World!';
  }

  async kickSSh(ip:string, user: string) {
    exec(`sudo blockssh ${ip} ${user}`, (error, stdout, stderr) => {
      if (error) {
        exec(`telegram-send "Error blocking the ${ip}"`)

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
    });


    return {
      status: 'ok',
      ip,
      user
    };
  }
}
