import { BaseErrorHandler } from "../interfaces/base-error-handler";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export class CategoriesErrorHandler implements BaseErrorHandler{
    handleError(err: HttpErrorResponse): Observable<never> {
        if(err.status === 400){
            console.log(err)
            const errorMessage = `CATEGORY.${err.status}`
            return throwError(() => errorMessage)
            }
    
            return throwError(() => 'UNKNOWN_ERROR');
        //Also it should send the error code to a server if is an unexpected error
    }
}
