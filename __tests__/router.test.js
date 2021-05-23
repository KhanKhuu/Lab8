/**
 * @jest-environment jsdom
 */

import {pushToHistory} from '../scripts/router.js'

describe('pushToHistory test', () => {
    test('settings', () => {
        let lengthBeforePush = history.length;
        pushToHistory('settings');
        expect(history.state).toEqual({ page: 'settings' });
        expect(history.length).toBe(lengthBeforePush + 1);
    });
    test('entry', () => {
        let lengthBeforePush = history.length;
        let randomEntryNumber = Math.floor((Math.random() * 10) + 1);
        pushToHistory('entry', randomEntryNumber);
        expect(history.state).toEqual({ page: `entry${randomEntryNumber}` });
        expect(history.length).toBe(lengthBeforePush + 1);
    });
    test('default', () => {
        let lengthBeforePush = history.length;
        pushToHistory('anything else');
        expect(history.state).toEqual( {} );
        expect(history.length).toBe(lengthBeforePush + 1);
    });
});
