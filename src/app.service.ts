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
        exec(`telegram-send "Error blocking the ip"`)
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });


    exec(`telegram-send "${ip} has been Blocked"`,  (e, s, st) => {
      if(e){
        console.log('telegram - error', e)
      }
      if(s){
        console.log('telegram - success', s)
      }
      if(st){
        console.log('telegram - out', st)
      }
    })


    return 'Hello World!';
  }
}
