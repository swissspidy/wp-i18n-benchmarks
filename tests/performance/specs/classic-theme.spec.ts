import { test } from '../fixtures';
import { testCases, iterate } from '../utils';

test.describe( 'Twenty Twenty-One', () => {
	test.beforeAll( async ( { requestUtils } ) => {
		await requestUtils.activateTheme( 'twentytwentyone' );
	} );

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
				testPage,
				metrics,
			}, testInfo ) => {
				const results = {
					Locale: locale,
					Scenario: scenario,
					'Object Cache': objectCache,
					...( await iterate( async () => {
						await testPage.visitHomepage();
						return {
							...( await metrics.getServerTiming( [
								'wp-memory-usage',
								'wp-total',
							] ) ),
							TTFB: await metrics.getTimeToFirstByte(),
						};
					} ) ),
					...( await iterate( async () => {
						await testPage.visitHomepage();
						return {
							...( await metrics.getLighthouseReport() ),
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
