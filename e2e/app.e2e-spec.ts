import { FroppingsDesktopPage } from './app.po';

describe('froppings-desktop App', function() {
  let page: FroppingsDesktopPage;

  beforeEach(() => {
    page = new FroppingsDesktopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
