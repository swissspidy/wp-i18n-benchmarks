#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { InfluxDB, Point } from '@influxdata/influxdb-client';

process.env.WP_ARTIFACTS_PATH ??= join( process.cwd(), 'artifacts' );

const args = process.argv.slice( 2 );

const resultsFile = args[ 0 ];

if ( ! resultsFile ) {
	console.error( 'You need to pass a results file!' );
	process.exit( 1 );
}

if ( ! existsSync( resultsFile ) ) {
	console.error( `File not found: ${ resultsFile }` );
	process.exit( 1 );
}

/**
 * @type {Array<{file: string, title: string, results: Record<string,string|number|boolean>[]}>}
 */
let stats;

try {
	stats = JSON.parse( readFileSync( resultsFile, { encoding: 'utf-8' } ) );
} catch {
	console.error( `Could not read file: ${ resultsFile }` );
	process.exit( 1 );
}

// TODO: These should all be set via env vars.
const token = process.env.INFLUXDB_TOKEN;
const url = 'http://localhost:8086';
const org = `WPP`;
const bucket = `I18N Benchmarks`;

const client = new InfluxDB( { url, token } );

const writeClient = client.getWriteApi( org, bucket, 'ns' );

// TODO: Pass current commit hash to InfluxDB ($GITHUB_SHA / `git rev-parse HEAD`)

for ( const { file, title, results } of stats ) {
	for ( const result of results ) {
		const point = new Point( 'performance-tests' );
		// TODO: file really needed? If title is unique that should be enough.
		point.tag( 'file', relative( process.cwd(), file ) );
		point.tag( 'title', title );

		for ( const [ key, value ] of Object.entries( result ) ) {
			// If it's not a number we need to add it as a tag.
			if ( typeof value === 'string' ) {
				point.tag( key, value );
			} else if ( typeof value === 'boolean' ) {
				point.booleanField( key, value );
			} else {
				// Always store values as floats to avoid type conflicts
				// if the field is sometimes an int and sometimes a float.
				point.floatField( key, value );
			}
		}

		writeClient.writePoint( point );
	}
}

await writeClient.close();
