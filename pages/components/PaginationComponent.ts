import type { xLocator } from "../../framework/core/xLocator";
import { xComponent } from "../../framework/core/xComponent";

export class PaginationComponent extends xComponent {
  readonly currentPage = this.root.locator("[aria-current='page'], .active").first() as xLocator;
  readonly nextButton = this.root.getByRole("link", { name: /next|›|»/i }).first() as xLocator;
  readonly pageLinks = this.root.getByRole("link", { name: /^\d+$/ });
  readonly previousButton = this.root
    .getByRole("link", { name: /prev|previous|‹|«/i })
    .first() as xLocator;

  pageLink(pageNumber: number): xLocator {
    return this.root
      .getByRole("link", { name: String(pageNumber), exact: true })
      .first() as xLocator;
  }

  async goToPage(pageNumber: number): Promise<void> {
    await this.pageLink(pageNumber).click();
  }

  async goToNextPage(): Promise<void> {
    await this.nextButton.click();
  }

  async goToPreviousPage(): Promise<void> {
    await this.previousButton.click();
  }

  async currentPageNumber(): Promise<number> {
    const text = (await this.currentPage.textContent()) ?? "";
    return Number.parseInt(text.trim(), 10);
  }
}
