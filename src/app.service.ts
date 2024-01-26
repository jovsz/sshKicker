import { Injectable } from '@nestjs/common';
import { Command, CommandFactory, CommandRunner, Option } from 'nest-commander';
const { exec } = require("child_process");


@Injectable()
export class AppService {



  getHello(): string {
    return 'Hello World!';
  }

  async kickSSh(ip:string) {
  console.log("AppService -> kickSSh -> ip", ip)


    exec(`sudo blockssh ${ip}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });


    return 'Hello World!';
  }
}
