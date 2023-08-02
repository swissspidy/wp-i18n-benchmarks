import { test as base } from '@wordpress/e2e-test-utils-playwright';
import { type Browser, chromium } from 'playwright';
import getPort from 'get-port';

import WpPerformancePack from './wpPerformancePack';
import Metrics from './metrics';
import TestUtils from './testUtils';
import TestPage from './testPage';

type PerformanceFixtures = {
	testPage: TestPage;
	metrics: Metrics;
	wpPerformancePack: WpPerformancePack;
};

export const test = base.extend<
	PerformanceFixtures,
	{
		testUtils: TestUtils;
		port: number;
		browser: Browser;
	}
>( {
	wpPerformancePack: async ( { admin, page, requestUtils }, use ) => {
		await use( new WpPerformancePack( { admin, page, requestUtils } ) );
	},
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
	testPage: async ( { page, admin }, use ) => {
		await use( new TestPage( { page, admin } ) );
	},
} );

export { expect } from '@wordpress/e2e-test-utils-playwright';
