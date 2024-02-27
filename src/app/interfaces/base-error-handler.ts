import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from "@angular/common/http";

export interface BaseErrorHandler {
    handleError(err: HttpErrorResponse): Observable<never>;
}