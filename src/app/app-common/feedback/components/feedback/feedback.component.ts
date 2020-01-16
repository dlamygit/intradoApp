import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'common-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {
    hidden = true;

    private text: string;
    private error: boolean;
    private items: string[];

    destroyed$ = new Subject<boolean>();

    constructor(
        private feedbackService: FeedbackService,
        private element: ElementRef
    ) { }

    ngOnInit() {
        const message = this.feedbackService.message;
        if (message) {
            this.setText(message.message, message.error, message.items);
            this.feedbackService.reset();
        }
        this.feedbackService.message$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(
            error => {
                this.setText(error.message, error.error, message.items);
            }
        );
    }

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    setText(text: string, error?: boolean, items?: string[], ) {
        this.error = error || false;
        this.text = text;
        this.items = items || null;
        this.hidden = false;
        (this.element.nativeElement as HTMLElement).scrollIntoView();
    }

    hide() {
        this.hidden = true;
    }

    get message() {
        return this.text;
    }

    get cssClass() {
        return {
            'alert-success': !this.error,
            'alert-danger': this.error,
        };
    }
}
