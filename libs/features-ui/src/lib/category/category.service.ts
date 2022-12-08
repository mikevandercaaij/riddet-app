
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Category } from "./category.model";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from "apps/riddet-app/src/environments/environment";


@Injectable({providedIn: 'root',})
export class CategoryService {
    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    getAll(): Observable<Category[]> {
        const httpOptions = this.authService.getHttpOptions();
        return this.httpClient.get<Category[]>(`${environment.SERVER_API_URL}/categories`, httpOptions) as Observable<Category[]>;
    }

    getById(categoryId: string): Observable<Category> {
        const httpOptions = this.authService.getHttpOptions();
        return this.httpClient.get<Category>(`${environment.SERVER_API_URL}/categories/${categoryId}`, httpOptions) as Observable<Category>;
    } 
}