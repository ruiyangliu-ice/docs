const productDocumentationTabLabels = new Set([
  '产品文档',
  'Product documentation',
  '製品ドキュメント',
  '제품 문서',
  'Tài liệu sản phẩm',
  'Produktdokumentation',
  'Documentazione del prodotto',
  'Documentación del producto',
  'Документация по продуктам',
]);

const localePrefixes = new Set(['en', 'ja', 'ko', 'vi', 'de', 'it', 'es', 'ru']);
const tabSelector = '.nav-tabs-item, nav-tabs-item, .mobile-nav-tabs-item, mobile-nav-tabs-item';

function normalizedText(element) {
  return element.textContent.replace(/\s+/g, ' ').trim();
}

function productOverviewPath() {
  const [locale] = window.location.pathname.split('/').filter(Boolean);
  return localePrefixes.has(locale) ? `/${locale}/products/overview` : '/products/overview';
}

function linkForTab(tab) {
  if (tab.matches('a')) return tab;
  return tab.closest('a') ?? tab.querySelector('a');
}

function tabFromClickEvent(event) {
  if (event.target instanceof Element) {
    const closestTab = event.target.closest(tabSelector);
    if (closestTab) return closestTab;
  }

  return event
    .composedPath()
    .find((element) => element instanceof Element && element.matches(tabSelector));
}

function updateProductDocumentationTabLinks() {
  document.querySelectorAll(tabSelector).forEach((tab) => {
    if (!productDocumentationTabLabels.has(normalizedText(tab))) return;

    const link = linkForTab(tab);
    if (link) link.setAttribute('href', productOverviewPath());
  });
}

updateProductDocumentationTabLinks();

new MutationObserver(updateProductDocumentationTabLinks).observe(document.documentElement, {
  childList: true,
  subtree: true,
});

document.addEventListener(
  'click',
  (event) => {
    const tab = tabFromClickEvent(event);
    if (!tab || !productDocumentationTabLabels.has(normalizedText(tab))) return;

    const destination = productOverviewPath();
    const link = linkForTab(tab);
    if (link) link.setAttribute('href', destination);

    // Let the browser handle new-tab/window gestures using the updated href.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    // Mintlify's client-side router retains the tab's original first-page route.
    // Intercept normal clicks before that handler runs and use the overview route.
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(destination);
  },
  true,
);
