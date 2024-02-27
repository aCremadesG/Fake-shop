import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseErrorHandler } from "../interfaces/base-error-handler";

export class LoginErrorHandler implements BaseErrorHandler{
    handleError(err: HttpErrorResponse): Observable<never> {
        throw new Error("Method not implemented.");
    }
}
