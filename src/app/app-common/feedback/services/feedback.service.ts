import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface FeedbackMessage {
    message: string;
    error: boolean;
    items: string[];
}


@Injectable({
    providedIn: 'root'
})
export class FeedbackService {

    message: FeedbackMessage;
    message$ = new Subject<FeedbackMessage>();

    constructor() { }

    reset() {
        this.message = null;
    }

    setMessage(message: string, error?: boolean, items?: string[]) {
        this.message = {
            message: message,
            error: Boolean(error),
            items: items || null
        };
        this.message$.next(this.message);
    }
}
