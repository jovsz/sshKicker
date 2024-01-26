import { Injectable } from '@nestjs/common';
const { exec } = require("child_process");


@Injectable()
export class AppService {



  getHello(): string {
    return 'Hello World!';
  }

  async kickSSh(ip: string, user: string) {
    console.log("AppService -> kickSSh -> user", user)

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
    });

    await exec(`ps fax | grep ${user}`, (error, stdout, stderr) => {
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



      exec(`sudo pkill --parent ${stdout.split('?')[0]}`);
      console.log("AppService -> awaitexec -> stdout", stdout.split('?')[0])
    })
    
    return {
      status: 'ok',
      ip,
      user
    };
  }
}
