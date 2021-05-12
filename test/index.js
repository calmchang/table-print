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
      <header style={{padding:"15px 0",marginBottom:"4px",borderBottom:"3px solid black"}}>
        上海阿里妈妈爸爸有限公司
      </header>
    )
  }
}

class Table extends React.Component{

  constructor(props) {
    super(props);
    let list=[];
    for(let i=0;i<12;i++){
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
        {/* <h1 className="title">
          产品申请单
          <span className="time">2021-01-01</span>
        </h1> */}
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
        
        <table className="noPage">详情3</table>


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
        
        <table className="noPage" border="1">
          <p>详情3</p>
          <p>详情3</p>
          <p>详情3</p>
        </table>
        

        <table className="userTable">
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
        <hgroup className="sign noPage">
          
          <table className="noPage">详情3</table>
          
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
  }
  onPrint(landscape){
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
      landscape:landscape,
      children:domTable.children[0].children,
      footer:true,//domFooter.children[0],
      header:domHeader.children[0],
      water:true,//domWater,
      waterHeight:150,
      debug:true
    });
    
    setTimeout(()=>{
      plugin.print(true);
    },0)
  }
  
  
  render() {
    return (
      <div>
        <hgroup className='row'>
          <div className="btn" onClick={this.onPrint.bind(this,false)}>打印-竖向</div>
          <div className="btn" onClick={this.onPrint.bind(this,true)}>打印-横向</div>
        </hgroup>
        <Table />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("container"));
