import { expect, type Page } from "@playwright/test";

import { PaginationComponent } from "./components/PaginationComponent";
import { ProductsCatalogComponent } from "./components/ProductsCatalogComponent";
import { SiteHeaderComponent } from "./components/SiteHeaderComponent";
import type { xLocator } from "../framework/core/xLocator";
import { xPage } from "../framework/core/xPage";

export class SearchResultsPage extends xPage {
  readonly header = new SiteHeaderComponent(this.$("header"));
  readonly pagination = new PaginationComponent(this.$(".pagination"));
  readonly path: string;
  readonly results = new ProductsCatalogComponent(this.$(".features_items"));

  constructor(page: Page, readonly query: string) {
    super(page);
    this.path = `/products?search=${encodeURIComponent(this.query)}`;
  }

  async isOpened(): Promise<void> {
    await expect(this.results.title).toHaveText("Searched Products");
    await expect(this.page).toHaveURL(/\/products\?search=/);
  }

  resultByName(name: string): xLocator {
    return this.results.cardByName(name);
  }

  async resultNames(): Promise<string[]> {
    const names = await this.results.cards.locator(".productinfo p").allTextContents();
    return names.map((name) => name.trim());
  }

  async openResult(name: string): Promise<void> {
    await this.results.openProductDetails(name);
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.pagination.goToPage(pageNumber);
  }
}
