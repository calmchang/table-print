import React from "react";
import ReactDOM from "react-dom";
import imgWater from './water.png';

import ReactPrintAutoPlugin from '../lib/index.js';
// import '../lib/index.css';

import './index.scss';
class Footer extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <footer className="table-print-footer-content">
        第@page/@total页
      </footer>
    )
  }
}
class Header extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <header className="table-print-header-content">
        上海阿里妈妈爸爸有限公司
      </header>
    )
  }
}

class Table extends React.Component{

  constructor(props) {
    super(props);
    let list=[];
    for(let i=0;i<40;i++){
      list.push({id:i,name:i,type:i,price:i,count:i,total:i})
    }
    this.state={
      list:list
    }
  }

  render(){
    const {list} = this.state;
    return (
      <section>
        <h1 className="title">
          产品申请单
          <span className="time">2021-01-01</span>
        </h1>
        <table className="applyInfo">
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
        <div className="label">详情</div>
        <table className="itemList">
          <thead>
            <tr>
              <th>产品编码</th>
              <th>产品名称</th>
              <th>产品型号</th>
              <th>单价(￥)</th>
              <th>内采数量</th>
              <th>总价(￥)</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item,idx)=>{
                return (
                  <tr key={idx} >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.price}</td>
                    <td>{item.count}</td>
                    <td>{item.total}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="label">使用人</div>
        <table className="userTable">
          <thead></thead>
          <tbody>
            <tr>
              <td rowSpan='2'>市场部</td>
              <td>测试人</td>
              <td>测试人</td>
              <td>测试人</td>
            </tr>
            <tr>
              <td>测试人</td>
              <td>测试人</td>
              <td>测试人</td>
            </tr>
            <tr>
              <td rowSpan='2'>技术中心</td>
              <td>测试人</td>
              <td>测试人</td>
              <td>测试人</td>
            </tr>
            <tr>
              <td>测试人</td>
              <td>测试人</td>
              <td>测试人</td>
            </tr>
          </tbody>
        </table>
        <hgroup className="sign">
          <div className="label">确认签字</div>
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

class Water extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <img className="water"src={imgWater} />
    )
  }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      count:2
    }
  }
  componentDidMount(){
    window.onPrint=this.onPrint;
  }
  onPrint(){
    let table = React.createElement(Table,{},null)
    let domTable = document.createElement('section');
    domTable.style.display='contents';
    ReactDOM.render(table, domTable);

    let footer = React.createElement(Footer,{},null);
    let domFooter = document.createElement('section');
    domFooter.style.display='contents';
    ReactDOM.render(footer, domFooter);

    let header = React.createElement(Header,{},null);
    let domHeader = document.createElement('section');
    domHeader.style.display='contents';
    ReactDOM.render(header, domHeader);

    let water = React.createElement(Water,{},null);
    let domWater = document.createElement('section');
    domWater.style.display='contents';
    ReactDOM.render(water, domWater);
    
  
    let plugin = new ReactPrintAutoPlugin({
      landscape:false,
      padding:40,
      children:domTable.children[0].children,
      footer:true,//domFooter.children[0],
      // header:domHeader.children[0],
      water:true,//domWater,
      // waterHeight:150,
      // debug:true
    });
    
    setTimeout(()=>{
      plugin.print();
    },0)
  }
  
  
  render() {
    return (
      <div>
        <div className="btn" onClick={this.onPrint.bind(this)}>打印</div>
        <Table />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
