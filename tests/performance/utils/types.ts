export enum Scenario {
	Default = 'Default',
	Dynamo = 'DynaMo',
	GingerMo = 'Ginger MO (MO)',
	GingerMoPhp = 'Ginger MO (PHP)',
	GingerMoJson = 'Ginger MO (JSON)',
	ObjectCache = 'Cache in object cache',
	Apcu = 'Cache in APCu',
	NativeGettext = 'Native Gettext',
	Pomodoro = 'Pomodoro',
	Transients = 'Cache in transients',
}

export type TestCase = {
	locale: string;
	scenario: Scenario;
	objectCache: boolean;
};
