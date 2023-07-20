import { Admin } from '@wordpress/e2e-test-utils-playwright';
import type { Page } from '@playwright/test';

class TestPage {
	page: Page;
	admin: Admin;

	constructor( { page, admin }: { page: Page; admin: Admin } ) {
		this.page = page;
		this.admin = admin;
	}

	async visitHomepage() {
		await this.page.goto( '/' );
	}

	async visitDashboard() {
		await this.admin.visitAdminPage( 'index.php', '' );
	}
}

export default TestPage;
