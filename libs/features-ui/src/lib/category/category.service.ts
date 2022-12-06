
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "@riddet-app/util-ui";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Category } from "./category.model";


@Injectable({providedIn: 'root',})
export class CategoryService {
    constructor(private httpClient: HttpClient, private authService: AuthService, private configService : ConfigService) {}

    getAll(): Observable<Category[]> {
        const httpOptions = this.authService.getHttpOptions();
        return this.httpClient.get<Category[]>(`${this.configService.getConfig().apiEndpoint}/categories`, httpOptions) as Observable<Category[]>;
    }

    getById(categoryId: string): Observable<Category> {
        const httpOptions = this.authService.getHttpOptions();
        return this.httpClient.get<Category>(`${this.configService.getConfig().apiEndpoint}/categories/${categoryId}`, httpOptions) as Observable<Category>;
    } 
}