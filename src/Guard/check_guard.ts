import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
 constructor(private reflector: Reflector) {}
 canActivate(context: ExecutionContext): boolean {
 const request = context.switchToHttp().getRequest().url.split('ssh/')[1].split('/')[0];
 
 return request.toString() === process.env.SECRET_KEY;
 }
}