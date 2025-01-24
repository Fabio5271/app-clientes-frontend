import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.match('login')){
            return next.handle(req);
        }
        const creds = JSON.parse(localStorage.getItem('userCreds')!);
        const isLoggedIn = (creds.nome != "" && creds.senha != "");
        const isApiUrl = req.url.startsWith('http://localhost:8081/api');
        if (isLoggedIn && isApiUrl) {
            console.log(req.headers);
            req = req.clone({
                setHeaders: {
                    Authorization: `Basic ${creds.token}`
                },
                
            });
        }
        return next.handle(req);
    }
}
