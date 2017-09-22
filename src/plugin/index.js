import {generateComponent} from '../components/'
import ReactDOM from  'react-dom'

export let create = function(jsResources, cssResources, bootCode) {
  return function(hook, vm) {
    let id = 0

    class Components {
      constructor() {
        this.componentCache = {}
      }

      cache(Component, id) {
        let href = window.location.href
        let componentObj = {
          id,
          Component
        }

        if (this.componentCache[href]) {
          this.componentCache[href].push(componentObj)
        } else {
          this.componentCache[href] = [componentObj]
        }
      }

      renderFromCache() {
        let href = window.location.href
        let componentObjs = this.componentCache[href]
        if (componentObjs) {
          componentObjs.forEach(componentObj => {
            ReactDOM.render(componentObj.Component(), document.getElementById(componentObj.id + ''))
          })
        }
      }
    }

    let components = new Components()

    function renderComponent(Component, id) {
      components.cache(Component, id)

      setTimeout(function () {
        ReactDOM.render(Component(), document.getElementById(id + ''))
      })
    }

    // for debug
    window.__components = components

    window.$docsify.markdown = {
      renderer: {
        code: function(code, lang) {
          if (/^\/\*\s*react\s*\*\//.test(code)) {
            id++
            let Component = generateComponent(code, lang, jsResources, cssResources, bootCode)
            renderComponent(Component, id)
            return '<div id="' + id + '" class="demo-box demo-box-react"/></div/>'
          } else {
            lang = lang || ''
            let hl = Prism.highlight(code, Prism.languages[lang] || Prism.languages.markup)
            return '<pre v-pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
          }
        }
      }
    }

    hook.mounted(function() {
      // Called after initial completion. Only trigger once, no arguments.
      vm.router.onchange(_ => {
        components.renderFromCache()
      })
    })
  }
}
