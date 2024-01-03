import { test as base } from '@wordpress/e2e-test-utils-playwright';
import { type Browser, chromium } from '@playwright/test';
import getPort from 'get-port';

import Metrics from './metrics';
import TestUtils from './testUtils';

type PerformanceFixtures = {
	metrics: Metrics;
};

export const test = base.extend<
	PerformanceFixtures,
	{
		testUtils: TestUtils;
		port: number;
		browser: Browser;
	}
>( {
	port: [
		async ( {}, use ) => {
			const port = await getPort();
			await use( port );
		},
		{ scope: 'worker' },
	],
	// TODO: Only launch browser & set port when metrics is actually being used.
	browser: [
		async ( { port }, use ) => {
			const browser = await chromium.launch( {
				args: [ `--remote-debugging-port=${ port }` ],
			} );
			await use( browser );

			await browser.close();
		},
		{ scope: 'worker' },
	],
	metrics: async ( { page, port }, use ) => {
		await use( new Metrics( page, port ) );
	},
	testUtils: [
		async ( { requestUtils }, use ) => {
			const testUtils = new TestUtils( { requestUtils } );

			await use( testUtils );
		},
		{ scope: 'worker', auto: true },
	],
} );

export { expect } from '@wordpress/e2e-test-utils-playwright';
