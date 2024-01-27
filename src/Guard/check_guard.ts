import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
 constructor(private reflector: Reflector) {}
 canActivate(context: ExecutionContext): boolean {
 const request = context.switchToHttp().getRequest().url.split('ssh/')[1].split('/')[0];
 console.log("AuthGuard -> canActivate -> request",  request)
 // we use a hardcoded string to validate the user for sake of simplicity
 return request.toString() === process.env.SECRET_KEY;
 }
}