const login = async (page, url) => {
  await page.goto(`${url}/signin/`);
  await page.waitForSelector('.gh-input.email');
  await page.type('.gh-input.email', 'admin@email.com');
  await page.type('.gh-input.password', 'pruebasE2E');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
};

const deleteAll = async (page, url, flag) => {
  await page.waitForSelector('.gh-app');
  await page.goto(`${url}/settings/labs`);
  const buttonDeleteName = flag ? 'button.gh-btn.gh-btn-red.js-delete' : 'button[data-test-button="delete-all"]';
  await page.waitForSelector(buttonDeleteName);
  await page.click(buttonDeleteName);
  await page.waitForSelector('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view');
  await page.click('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view');
  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
};

const goToDashboard = async (page, url) => {
  await page.goto(`${url}/dashboard`);
  await page.waitForSelector('.gh-app');
};

module.exports = async (page, scenario) => {
  await require('./loadCookies')(page, scenario);

  const cmd = `${process.env.CMD || ''}`.trim();
  const flag = cmd === 'test';
  const url = scenario[
    flag ? 'url' : 'referenceUrl'
  ].split('#')[0] + '#';

  await login(page, url);
  await deleteAll(page, url, flag);
  await goToDashboard(page, url);
  console.log('End login, deleteAll and goToDashboard');
};
