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
        console.log(`error: ${error.message}`);
        exec(`telegram-send "Error blocking the ip"`)
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });


    return {};
  }
}
