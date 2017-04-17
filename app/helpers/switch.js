const $ = require('jquery')

/**
 * This function enables an array of CSS files, whilst disabling
 * the rest.
 * 
 * @param  {array} titles
 * @return {undefined}
 */
global.style = (titles) => {
  for (let i = 0; i < document.styleSheets.length; i++) {
    let shouldEnable = titles.includes(document.styleSheets[i].ownerNode.getAttribute('data-name')) || document.styleSheets[1].ownerNode.getAttribute('data-name').includes('all-')

    document.styleSheets[i].disabled = !shouldEnable

    if (titles.includes(document.styleSheets[i].ownerNode.getAttribute('data-name'))) {
      titles.splice(titles.indexOf(document.styleSheets[i].ownerNode.getAttribute('data-name')), 1)
    }
  }
  if (titles.length) {
    logger.error(`Warning, ${titles} was/were not found within the list of stylesheets.`)
    logger.log(document.styleSheets)
  }
}

/**
 * Page handles all our application state switching by enabling
 * and disabling CSS, and loading the HTML into the body of the
 * application
 * 
 * @param  {string} page
 * @param  {array} css
 * @return {undefined}
 */
global.page = (page, css) => {
  logger.debug(`Switching page to ${page}`)
  $('#content').html(appDir.read(`./app/${page}.html`))
  style(css)
}