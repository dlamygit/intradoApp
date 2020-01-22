import { Injectable } from '@angular/core';
import { BUILD_CONSTANTS } from '../constants/build-constants';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {

    private _buildSizes = [
        BUILD_CONSTANTS.SMALL_SIZE,
        BUILD_CONSTANTS.MEDIUM_SIZE,
        BUILD_CONSTANTS.LARGE_SIZE,
        BUILD_CONSTANTS.EXTRA_LARGE_SIZE
    ];

    constructor() { }

    get buildSizes() {
        return this._buildSizes;
    }
}
