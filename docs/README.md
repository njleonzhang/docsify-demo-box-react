# [docsify-demo-box-react](https://github.com/njleonzhang/docsify-demo-box-react/)

> a plugin for [docsify](https://docsify.js.org/#/) to write React jsx demo with instant preview and jsfiddle integration

## Usage

1. import react and this plugin to docsify `index.html`
```
<script src="https://cdn.bootcss.com/react/15.6.1/react.js"></script>
<script src="https://cdn.bootcss.com/react/15.6.1/react-dom.js"></script>
<script src="https://unpkg.com/docsify-demo-box-react@{version}/dist/docsify-demo-box-react.min.js"></script>
```

2. Use this plugin as docsify plugin
```js
   window.$docsify = {
     plugins: [
       DemoBoxPlugin.create(jsResources, cssResources, bootCode)
     ]
   }
```

parameter of `DemoBoxPlugin.create`:
* jsResources: javascript script will be added in `jsfiddle` html filed
* cssResources: css link will be added in `jsfiddle` css filed
* bootCode: javascript code you want to add before sample code in `jsfiddle` javascript filed, which is usually used to boot your library.


## sample

This doc is a sample, check the source [md](https://njleonzhang.github.io/docsify-demo-box-react/)

write the following code with tag `/*react*/`:

```
<desc>
hello, this is a `sample`
</desc>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
    }
    render() {
      return (
        <div>
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('test'); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
</script>

```

it will render as:

```jsx
/*react*/
<desc>
hello, this is a `sample`
</desc>
<script>
  export default class Application extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        color: 'blue'
      }
    }
    render() {
      return (
        <div>
          <div className='wrapper' ref={el => this.el = el}>
            <div>
            <button style={{color: this.state.color}} className='test' onClick={e => {alert('test'); this.setState({color: 'red'})}}>test</button>
            </div>
          </div>
        </div>
      )
    }
  }
</script>
```

# Advanced options, AKA comments

## don't embed the global bootcode
If you do not want the global bootcode configed by DemoBoxPlugin.create for some samples, add comment:

```
/*no-boot-code*/
```
* [Vue version sample code](https://github.com/njleonzhang/vue-data-tables/blob/master/docs/searchBoxFilter.md#customize-filter-logic)
* [Vue version sample](https://njleonzhang.github.io/vue-data-tables/#/searchBoxFilter?id=customize-filter-logic)


## special js link
If you want to add special jsResource for some samples, use jsResource comments

```
/*jsResource jslink1 jslink2 ...*/
```

* [Vue version sample code](https://github.com/njleonzhang/vue-data-tables/blob/master/docs/event.md#filtered-data)
* [Vue version sample](https://njleonzhang.github.io/vue-data-tables/#/event?id=filtered-data)

