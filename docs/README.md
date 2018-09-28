# [docsify-demo-box-react](https://github.com/njleonzhang/docsify-demo-box-react/)

> A plugin for [docsify](https://docsify.js.org/#/) to write React jsx demo with instant preview and jsfiddle integration

This plugin is for React. For Vue, please use [docsify-demo-box-vue](https://njleonzhang.github.io/docsify-demo-box-vue)

## Usage

1. import react and this plugin to docsify `index.html`
```html
<script src="https://cdn.bootcss.com/react/15.6.1/react.js"></script>
<script src="https://cdn.bootcss.com/react/15.6.1/react-dom.js"></script>
<script src="https://unpkg.com/docsify-demo-box-react@{version}/dist/docsify-demo-box-react.min.js"></script>
```

2. Use this plugin as docsify plugin
```js
  var jsResources = '<scr' + 'ipt src="//cdn.bootcss.com/react/15.6.1/react.js"></scr' + 'ipt>\n' +
    '<scr' + 'ipt src="//cdn.bootcss.com/react/15.6.1/react-dom.js"></scr' + 'ipt>'
  var cssResources = '@import url("//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css");'
  var bootCode = 'var globalVariable = "leon"'
  var globalVariable = "leon"

  window.$docsify = {
    name: 'docsify-demo-box-react',
    repo: 'https://github.com/njleonzhang/docsify-demo-box-react',
    plugins: [
      DemoBoxReact.create(jsResources, cssResources, bootCode)
    ]
  }
```

parameter of `create`:
* jsResources: javascript script will be added in `jsfiddle` html filed
* cssResources: css link will be added in `jsfiddle` css filed
* bootCode: javascript code you want to add before sample code in `jsfiddle` javascript filed, which is usually used to boot your library.


## sample

This doc is a sample, check the source [md](https://njleonzhang.github.io/docsify-demo-box-react/)

write the following code with tag `/*react*/`:

```jsx
<desc>
Hello `world`
* a
* b
</desc>
<style>
  .author {
    color: #ff0000cc;
  }
</style>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
      this.globalVariable = globalVariable
    }
    render() {
      return (
        <div>
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <p class='author'>author: {this.globalVariable}</p>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('author: ' + this.globalVariable); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
```

it will render as:

```jsx
/*react*/
<desc>
Hello `world`
* a
* b
</desc>
<style>
  .author {
    color: #ff0000cc;
  }
</style>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
      this.globalVariable = globalVariable
    }
    render() {
      return (
        <div>
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <p className='author'>author: {this.globalVariable}</p>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('author: ' + this.globalVariable); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
```

The sample code is rendered on the page instantly, so the people who read your document can see the preview immediately.
If he/she expands the demo box, the source code and description are shown there.
Click the button `Try in Jsfiddle`, `jsfiddle.net` will be open with the code of this sample.

> notice: You must write the component as a class and export it as default, like `export default class Application extends React.Component`, because this plugin use the key word `export default class` to parse the code.

> `desc` tag can be used to add description for the sample. `Markdown` syntax is supported

## Advanced options, AKA comments

### Don't embed the global bootcode

In this sample, you may have found that `globalVariable` is defined in `index.html`.

```js
  var bootCode = 'var globalVariable = "leon"' // bootCode is for jsfiddle
  var globalVariable = "leon"   // this define is rendering for preview
```

Now if you want to change the value of `globalVariable`, you need to change both values for preview and `jsfiddle`.
It's easy for preview, just override the define. but for `jsfiddle`, you need this comments `/*no-boot-code*/`.

```jsx
/*react*/
/*no-boot-code*/
<desc>
Hello world
</desc>
<script>
  let globalVariable = 'leon zhang'
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
      this.globalVariable = globalVariable
    }
    render() {
      return (
        <div>
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <p>author: {this.globalVariable}</p>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('author: ' + this.globalVariable); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
</script>
```

### special js link
In this sample, default js resource is defined as `react` and `react-dom` in `index.html`

```
// for preview
<script src="https://cdn.bootcss.com/react/15.6.1/react.js"></script>
<script src="https://cdn.bootcss.com/react/15.6.1/react-dom.js"></script>

// for jsfiddle
var jsResources = '<scr' + 'ipt src="//cdn.bootcss.com/react/15.6.1/react.js"></scr' + 'ipt>\n' +
    '<scr' + 'ipt src="//cdn.bootcss.com/react/15.6.1/react-dom.js"></scr' + 'ipt>'
```


If you want to add special js resource for some samples, you need add `script` link in `index.html` for preview.
At same time, use `jsResource` comment to add script for `jsfiffle`

```
/*jsResource jslink1 jslink2 ...*/
```

```jsx
/*react*/
/*jsResource https://unpkg.com/vue */
<desc>
Hello world
</desc>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
      this.globalVariable = globalVariable
    }
    render() {
      return (
        <div>
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <p>author: {this.globalVariable}</p>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('author: ' + this.globalVariable); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
</script>
```

Try in `jsfiddle`, you will find the following script is added to `jsfiddle` html area.
```
<script src="https://unpkg.com/vue"></script>
```
