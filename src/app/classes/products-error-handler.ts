import { HttpErrorResponse } from "@angular/common/http";
import { BaseErrorHandler } from "../interfaces/base-error-handler";
import { Observable, throwError } from "rxjs";

export class ProductsErrorHandler implements BaseErrorHandler{
    handleError(err: HttpErrorResponse): Observable<never> {
        if(err.status === 400){
        console.log(err)
        const errorMessage = `PRODUCT.${err.status}`
        return throwError(() => errorMessage)
        }

        return throwError(() => 'UNKNOWN_ERROR');
        //Also it should send the error code to a server if is an unexpected error
    }
}
