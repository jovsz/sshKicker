import { Injectable } from '@nestjs/common';
const { exec } = require("child_process");


@Injectable()
export class AppService {



  getHello(): string {
    return 'Hello World!';
  }



  async kickSSh(ip: string, user: string) {
    await exec(`sudo blockssh ${ip} ${user}`, (error, stdout, stderr) => {
      if (error) {
        return {
          status: 'failed',
          ip,
          user
        };
      }
      if (stderr) {
        exec(`telegram-send "StdoutError: ${stderr}"`)
        return {
          status: 'failed-stdout',
          ip,
          user,
          stderr
        };
      }
    });

    await exec(`ps ax | grep sshd`, (error, stdout, stderr) => {
      if (error) {
        return {
          status: 'failed',
          ip,
          user
        };
      }
      if (stderr) {
        exec(`telegram-send "StdoutError: ${stderr}"`)

        return {
          status: 'failed-stdout',
          ip,
          user,
          stderr
        };
      }
      
      exec(`sudo pkill --parent ${stdout.split('\n').find(e => e.includes(user)).split('?')[0].replace(/\s/g, '')}`);

    })

    exec(`telegram-send "user: ${user} with ip:${ip} has been Blocked"`);

    return {
      status: 'ok',
      ip,
      user
    };
  }
}
