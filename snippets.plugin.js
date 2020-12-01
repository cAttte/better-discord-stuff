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

const snippetsIcon = `<svg width="24" height="24" viewBox="-1 -1.5 23 23"><mask/><g mask="url(#snippetsIconMask)"><path fill="currentColor" d="M 4.618, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 s 0.573 -0.256, 0.573 -0.573 V 0.573 C 5.191, 0.256, 4.935, 0, 4.618, 0 z"/><path fill="currentColor" d="M 8.053, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 s 0.573 -0.256, 0.573 -0.573 V 0.573 C 8.626, 0.256, 8.37, 0, 8.053, 0 z"/><path fill="currentColor" d="M 11.489, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 c 0.316, 0, 0.573 -0.256, 0.573 -0.573 V 0.573 C 12.061, 0.256, 11.805, 0, 11.489, 0 z "/><path fill="currentColor" d="M 14.924, 0 c -0.316, 0 -0.573, 0.256 -0.573, 0.573 v 1.145 c 0, 0.316, 0.256, 0.573, 0.573, 0.573 c 0.316, 0, 0.573 -0.256, 0.573 -0.573 V 0.573 C 15.496, 0.256, 15.24, 0, 14.924, 0 z"/><path fill="currentColor" d="M 16.641, 1.25 V 1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 c 0, 0.947 -0.77, 1.718 -1.718, 1.718 c -0.947, 0 -1.718 -0.77 -1.718 -1.718 V 1.25 C 2.236, 1.488, 1.756, 2.117, 1.756, 2.863 v 14.962 c 0, 0.947, 0.77, 1.718, 1.718, 1.718 h 12.595 c 0.947, 0, 1.718 -0.77, 1.718 -1.718 V 2.863 C 17.786, 2.117, 17.306, 1.488, 16.641, 1.25 z M 14.924, 16.679 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 c 0 -0.316, 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 C 15.496, 16.423, 15.24, 16.679, 14.924, 16.679 z M 14.924, 13.244 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 c 0 -0.316, 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 C 15.496, 12.988, 15.24, 13.244, 14.924, 13.244 z M 14.924, 9.733 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 s 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 S 15.24, 9.733, 14.924, 9.733 z M 14.924, 6.298 H 4.618 c -0.316, 0 -0.573 -0.256 -0.573 -0.573 s 0.256 -0.573, 0.573 -0.573 h 10.305 c 0.316, 0, 0.573, 0.256, 0.573, 0.573 S 15.24, 6.298, 14.924, 6.298 z"/></g><extra/></svg><mask id="snippetsIconMask" fill="black"><path d="M 0 0 H 24 V 24 H 0 Z" fill="white"></path><path d="M24 12 H 12 V 24 H 24 Z" fill="black"></path></mask>`

module.exports = class Snippets /**/ extends Plugin {
    patchedModules = {
        after: {
            ChannelTextAreaContainer: "render"
        }
    }

    onStart() {
        BDFDB.PatchUtils.forceAllUpdates(this)
    }

    processChannelTextAreaContainer(element) {
        const normal = BDFDB.DiscordConstants.TextareaTypes.NORMAL
        const editor = BDFDB.ReactUtils.findChild(element.returnvalue, {
            name: "ChannelEditorContainer"
        })

        if (editor && editor.props.type === normal && !editor.props.disabled) {
            const props = [["className", BDFDB.disCN.textareapickerbuttons]]
            const parent = BDFDB.ReactUtils.findParent(element.returnvalue, { props })
            const child = parent[0][parent[1]]

            const buttonProps = {
                className: BDFDB.disCN.textareapickerbutton,
                nativeClass: true,
                iconSVG: snippetsIcon
            }

            const button = BDFDB.ReactUtils.createElement(
                BDFDB.LibraryComponents.ChannelTextAreaButton,
                buttonProps
            )

            const popoutContainerProps = {
                width: 400,
                padding: 10,
                animation: BDFDB.LibraryComponents.PopoutContainer.Animation.SCALE,
                position: BDFDB.LibraryComponents.PopoutContainer.Positions.TOP,
                align: BDFDB.LibraryComponents.PopoutContainer.Align.RIGHT,
                children: button
            }

            const popoutContainer = BDFDB.ReactUtils.createElement(
                BDFDB.LibraryComponents.PopoutContainer,
                popoutContainerProps
            )

            child.props.children.unshift(popoutContainer)
        }
    }
}
