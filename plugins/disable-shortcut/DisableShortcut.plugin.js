/**
 * @name DisableShortcut
 * @version 1.0.0
 * @description Quickly disable/enable themes.
 * @author cAtte_
 * @authorLink https://github.com/cAttte
 * @updateUrl https://raw.githubusercontent.com/cAttte/bd-disable-shortcut/master/DisableShortcut.plugin.js
 * @website https://github.com/cAttte/better-discord-stuff/blob/master/plugins/disable-shortcut#readme
 * @source https://github.com/cAttte/better-discord-stuff/blob/master/plugins/disable-shortcut/DisableShortcut.plugin.js
 * @updateUrl https://raw.githubusercontent.com/cAttte/better-discord-stuff/master/plugins/disable-shortcut/DisableShortcut.plugin.js
 */

module.exports = class DisableShortcutPlugin {
    themeCache = {}
    interval = 0
    enabled = true

    start() {
        document.addEventListener("keyup", this.handleKeyUp.bind(this))
    }

    stop() {
        document.removeEventListener("keyup", this.handleKeyUp.bind(this))
    }

    /** @param {KeyboardEvent} event */
    handleKeyUp(event) {
        if (event.altKey && event.key.toUpperCase() === "T") {
            if (this.enabled) {
                this.disableThemes()
                this.enabled = false
            } else {
                this.enableThemes()
                this.enabled = true
            }
        }
    }

    disableThemes() {
        const themes = BdApi.Themes.getAll()
        for (const theme of themes) {
            const enabled = BdApi.Themes.isEnabled(theme.name)
            this.themeCache[theme.name] = enabled
            if (enabled) BdApi.Themes.disable(theme.name)
        }
    }

    enableThemes() {
        for (const [theme, enabled] of Object.entries(this.themeCache)) {
            if (enabled) BdApi.Themes.enable(theme)
        }
    }
}
