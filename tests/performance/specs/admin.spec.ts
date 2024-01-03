import { test } from '../fixtures';
import { testCases, iterate } from '../utils';

test.describe( 'WordPress Admin', () => {
	for ( const testCase of testCases ) {
		const { locale, scenario, objectCache } = testCase;

		test.describe( `Locale: ${ locale }, Scenario: ${ scenario }, Object Cache: ${
			objectCache ? 'Yes' : 'No'
		}`, () => {
			test.beforeAll( async ( { testUtils } ) => {
				await testUtils.prepareTestCase( testCase );
			} );

			test.afterAll( async ( { testUtils } ) => {
				await testUtils.resetSite();
			} );

			test( 'Server Timing Metrics', async ( {
				admin,
				metrics,
			}, testInfo ) => {
				const results = {
					Locale: locale,
					Scenario: scenario,
					'Object Cache': objectCache,
					...( await iterate( async () => {
						await admin.visitAdminPage( 'index.php' );
						return {
							...( await metrics.getServerTiming( [
								'wp-memory-usage',
								'wp-total',
							] ) ),
							TTFB: await metrics.getTimeToFirstByte(),
						};
					} ) ),
					...( await iterate( async () => {
						return {
							...( await metrics.getLighthouseReport(
								`${ baseURL }/wp-admin/index.php`
							) ),
						};
					}, Number( process.env.LIGHTHOUSE_RUNS ) ) ),
				};

				await testInfo.attach( 'results', {
					body: JSON.stringify( results, null, 2 ),
					contentType: 'application/json',
				} );
			} );
		} );
	}
} );
