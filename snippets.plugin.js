/**
 * @name Snippets
 * @version 0.0.0
 * @description Add a Snippets panel to the message bar.
 * @author cAtte_
 * @authorLink https://github.com/cAttte
 * @website https://github.com/cAttte/bd-snippets
 * @source https://github.com/cAttte/bd-snippets/blob/master/snippets.plugin.js
 * @updateUrl https://raw.githubusercontent.com/cAttte/bd-snippets/master/snippets.plugin.js
 */

const [Plugin, BDFDB] = window.BDFDB_Global.PluginUtils.buildPlugin({
    info: {
        name: "Snippets",
        author: "cAtte_",
        version: "0.0.0",
        description: "Add a Snippets panel to the message bar."
    }
})

module.exports = class Snippets extends Plugin {}
