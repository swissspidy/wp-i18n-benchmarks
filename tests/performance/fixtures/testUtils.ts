import { RequestUtils } from '@wordpress/e2e-test-utils-playwright';
import { Scenario, type TestCase } from '../utils/types';

class TestUtils {
	requestUtils: RequestUtils;

	constructor( { requestUtils }: { requestUtils: RequestUtils } ) {
		this.requestUtils = requestUtils;
	}

	async prepareTestCase( { objectCache, scenario, locale }: TestCase ) {
		await this.requestUtils.updateSiteSettings( {
			language: 'en_US' === locale ? '' : locale,
		} );

		if ( objectCache ) {
			await this.requestUtils.activatePlugin( 'sqlite-object-cache' );
		}

		if ( scenario === Scenario.Dynamo ) {
			await this.requestUtils.activatePlugin( 'dynamo' );
		}

		if ( scenario === Scenario.NativeGettext ) {
			await this.requestUtils.activatePlugin( 'native-gettext' );
		}

		if ( scenario === Scenario.ObjectCache ) {
			await this.requestUtils.activatePlugin( 'wp-performance-pack' );
		}

		if ( scenario === Scenario.Apcu ) {
			await this.requestUtils.activatePlugin( 'translations-cache' );
		}

		if ( scenario === Scenario.Transients ) {
			await this.requestUtils.activatePlugin(
				'a-faster-load-textdomain'
			);
		}

		if ( scenario === Scenario.Pomodoro ) {
			await this.requestUtils.activatePlugin(
				'pomodoro-translation-cache'
			);
		}

		if (
			scenario === Scenario.GingerMo ||
			scenario === Scenario.GingerMoPhp ||
			scenario === Scenario.GingerMoJson
		) {
			await this.requestUtils.activatePlugin( 'performant-translations' );
		}

		if ( scenario === Scenario.GingerMo ) {
			await this.requestUtils.activatePlugin( 'ginger-mo-prefer-mo' );
		}

		if ( scenario === Scenario.GingerMoJson ) {
			await this.requestUtils.activatePlugin( 'ginger-mo-prefer-json' );
		}

		await this.clearCaches();
	}

	// Not using Promise.all() to avoid race conditions.
	async resetSite() {
		await this.requestUtils.updateSiteSettings( {
			language: '',
		} );

		await this.requestUtils.deactivatePlugin( 'wordpress-importer' );
		await this.requestUtils.deactivatePlugin( 'dynamo' );
		await this.requestUtils.deactivatePlugin( 'performant-translations' );
		await this.requestUtils.deactivatePlugin( 'ginger-mo-prefer-json' );
		await this.requestUtils.deactivatePlugin( 'ginger-mo-prefer-mo' );
		await this.requestUtils.deactivatePlugin( 'sqlite-object-cache' );
		await this.requestUtils.deactivatePlugin( 'native-gettext' );
		await this.requestUtils.deactivatePlugin( 'wp-performance-pack' );
		await this.requestUtils.deactivatePlugin( 'translations-cache' );
		await this.requestUtils.deactivatePlugin( 'a-faster-load-textdomain' );
		await this.requestUtils.deactivatePlugin(
			'pomodoro-translation-cache'
		);

		await this.clearCaches();
	}

	private async clearCaches() {
		await this.requestUtils.request.head(
			`${ this.requestUtils.baseURL }/?clear-cache=opcache`
		);
		await this.requestUtils.request.head(
			`${ this.requestUtils.baseURL }/?clear-cache=object-cache`
		);
		await this.requestUtils.request.head(
			`${ this.requestUtils.baseURL }/?clear-cache=apcu`
		);
	}
}

export default TestUtils;
