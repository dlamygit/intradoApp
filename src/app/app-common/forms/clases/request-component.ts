import { OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FeedbackComponent } from '../../feedback/components/feedback/feedback.component';

export abstract class RequestComponent implements OnDestroy {
    @ViewChild(FeedbackComponent, {
        static: true
    }) feedback: FeedbackComponent;

    destroyed$ = new Subject<boolean>();

    ngOnDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}
