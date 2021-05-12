![react](https://img.shields.io/badge/react-support-blue)
![js+dom](https://img.shields.io/badge/js+dom-support-red)
![vue](https://img.shields.io/badge/vue-support-success)
<!-- ![node](https://img.shields.io/badge/node-%3E%3D8-green)
![npm](https://img.shields.io/badge/npm-%3E%3D6.14.5-orange) -->

### 简介
js-table-print是一款智能打印插件，目标是处理表格的打印，实现自定义页头、页尾、水印、分页方式等


### install    
`npm install js-table-print`

### usage  
```javascript

import TablePrint from 'js-table-print';

let plugin = new TablePrint({
  children:domTable,//需要打印的内容
  header:domHeader,//每页的页头
  footer:true,//每页的页号
  water:true,//添加分页水印
});
setTimeout(()=>{
  plugin.print(true);//弹出预览确认框
},0)
```


### 预览  
![review.jpg](http://img.vuedata.cn/table-print.gif)

### 环境支持  
1、react  
2、原生js+dom

### 功能列表  
1、设定某些DOM节点组成一组，必须打印在同一张页面内，如果被切割则会重新分页打印。  
2、提供页头和页尾样式，也可自定义样式。  
3、提供分页出的水印样式，也可自定义样式。  
4、可设定横向或纵向打印  
5、样式完全根据当前页面样式打印，无需再次单独导入css  


### with React  

```javascript
import TablePrint from 'js-table-print';

class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  onPrint(){
    let table = React.createElement(Table,{},null)
    let domTable = document.createElement('section');
    domTable.style.display='contents';
    ReactDOM.render(table, domTable);
  
    let plugin = new TablePrint({
      children:domTable.children[0].children,
      footer:true,
      water:true,
    });
    setTimeout(()=>{
      plugin.print();
    },0)
  }
    
  render() {
    return (
      <div>
        <div onClick={this.onPrint.bind(this)}>点击生成表单并打印</div>
      </div>
    );
  }
}


class Table extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const {list} = this.state;
    return (
      <section>
        <h1>
          产品申请单
          <span>2021-01-01</span>
        </h1>
        <table >
          <thead></thead>
          <tbody >
            <tr>
              <td>申请人</td>
              <td>测试人</td>
              <td>申请人部门</td>
              <td>测试部门</td>
            </tr>
            <tr>
              <td>总额</td>
              <td>￥123.00</td>
              <td>备注</td>
              <td>123123</td>
            </tr>
          </tbody>
        </table>
        <hgroup>
          <div>确认签字</div>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>申请人</td>
                <td></td>
                <td>收单人</td>
                <td></td>
              </tr>
              <tr>
                <td>上级审批</td>
                <td></td>
                <td>CEO确认</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </hgroup>
     </section>
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));

```


### with javascript  

```javascript
<script src="js-table-print.js"></script>
<link rel="stylesheet" type="text/css" href='mytable.css' />

var table=`
<h1>
  产品申请单
  <span>2021-01-01</span>
</h1>
<table >
  <thead></thead>
  <tbody >
    <tr>
      <td>申请人</td>
      <td>测试人</td>
      <td>申请人部门</td>
      <td>测试部门</td>
    </tr>
    <tr>
      <td>总额</td>
      <td>￥123.00</td>
      <td>备注</td>
      <td>123123</td>
    </tr>
  </tbody>
</table>
<hgroup>
  <div>确认签字</div>
  <table>
    <thead></thead>
    <tbody>
      <tr>
        <td>申请人</td>
        <td></td>
        <td>收单人</td>
        <td></td>
      </tr>
      <tr>
        <td>上级审批</td>
        <td></td>
        <td>CEO确认</td>
        <td></td>
      </tr>
    </tbody>
  </table>
</hgroup>
`
document.body.innerHTML = table;

var TablePrint = TablePrint||window['js-table-print'].default;
let plugin = new TablePrint({
  children:document.body.children,
  footer:true,
  water:true,
});
setTimeout(()=>{
  plugin.print();
},0)


```



### Config  
参数|说明|类型|默认值
:-|:-|:-|:-
landscape|是否为横向布局|boolean|false
footer|页脚|boolean\|Dom|false
header|页头|boolean\|Dom|false
children|打印的内容|[Documents]|-
water|分页水印|boolean\|Document|false
waterHeight|水印高度|Number|-
debug|调试模式，调试模式下会将表格打印的预览图追加到body后面|boolean|false

### API   

方法|说明|类型
:-|:-|:-
print|激活打印 review为true时会弹出预览框确认|(review?:boolean)



### 常用CSS样式

* page-break-inside: avoid; 不要将dom内的内容分页
* page-break-before: alway; 在此DOM前插入一个分页
* page-break-after: alway; 在此DOM后插入一个分页

### 开发者环境  
node:10.15.0  
npm:6.14.5


### 更新日志  
* v1.1.2 发布修正了打印格式化的一些bug，并增加弹出预览框    
* v1.0.0 发布
