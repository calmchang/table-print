import './index.scss';

const A4_MARGIN=1.5;
const A4_HEIGHT=297-A4_MARGIN-A4_MARGIN;
const A4_WIDTH=210-A4_MARGIN-A4_MARGIN;
const A4_LANDSCAPE_WIDTH=A4_HEIGHT;
const A4_LANDSCAPE_HEIGHT=A4_WIDTH;
const DOM_ROOT='table-print-root';
const DOM_SRC_TABLE='table-print-src';
const DOM_HEADER='table-print-header';
const DOM_FOOTER='table-print-footer';

class TablePrint{
  constructor({
    padding=40,
    landscape=false,
    footer=null,
    header=null,
    targetDom=document.body,
    children=[],
    water=null,
    debug=false,
    waterHeight=0,
    }) {
    
    this.state={
      padding,
      landscape,
      children,
      footer,
      header,
      targetDom,
      water,
      waterHeight,
      PAGE_HEIGHT:landscape?A4_LANDSCAPE_HEIGHT:A4_HEIGHT,
      PAGE_WIDTH:landscape?A4_LANDSCAPE_WIDTH:A4_WIDTH,
      debug,
    };
    this.footer_default = document.createElement('footer');
    this.footer_default.className="table-print-footer-content";
    this.footer_default.innerHTML=`@page/@total`;
  }
  mm2px(mm) {
    let targetDom = this.state.targetDom.querySelector(`#${DOM_SRC_TABLE}`);
    var tmpNode = document.createElement('div');
    tmpNode.style.cssText = `width:1mm;height:${mm}mm;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden`;
    targetDom.appendChild(tmpNode);
    let h = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
    console.log(`${mm}->${h}px`)
    return h;
  }
  preRenderGetHeight(dom) {
    let targetDom = this.state.targetDom.querySelector(`#${DOM_SRC_TABLE}`);

    var tmpNode = document.createElement('div');
    tmpNode.style.cssText = `position:absolute;left:0px;top:0px;z-index:99;visibility:hidden`;
    tmpNode.appendChild(dom);
    targetDom.appendChild(tmpNode);
    let h = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
    return h;
  }
  
  getThead(dom){
    if(dom.children[0].nodeName.toLocaleLowerCase()==='thead'){
      return dom.children[0];
    }
    return null;
  }
  getTBody(dom){
    if(dom.children[1].nodeName.toLocaleLowerCase()==='tbody'){
      return dom.children[1];
    }
    return null;
  }
  getAllTr(tbody){
    return tbody.children;
  }
  moveDom(dom,pageList,maxHeight){
    let height =dom.offsetHeight;
    let page = pageList[pageList.length-1];
    if(page.curHeight + height < maxHeight){
      page.children.push(dom);
      page.curHeight+=height;
    }else{
      if(dom.nodeName.toLocaleLowerCase()==='table'){
        let thead=this.getThead(dom);
        let tbody=this.getTBody(dom);

        const createNewTable=()=>{
          let newTable=dom.cloneNode();
          let newTBody = tbody.cloneNode();
          newTable.appendChild(thead.cloneNode(true));
          newTable.appendChild(newTBody);
          return {
            table:newTable,
            tbody:newTBody
          }
        }

        let curTable = createNewTable();
        for(let i=0;i<tbody.children.length;i++){
          let tr = tbody.children[i].cloneNode(true);
          curTable.tbody.appendChild(tr);
          let curH = this.preRenderGetHeight(curTable.table);
          if(page.curHeight + curH > maxHeight){
            if(tbody.children.length>1){
              curTable.tbody.removeChild(tr);
              page.children.push(curTable.table);
              let newPage={children:[],curHeight:0,maxHeight:maxHeight};
              pageList.push(newPage);
              page = newPage;
              curTable = createNewTable();
              i--;
              
            }else{
              let newPage={children:[],curHeight:0,maxHeight:maxHeight};
              pageList.push(newPage);
              page = newPage;
              page.children.push(curTable.table);
              page.curHeight+=curH;
              curTable = createNewTable();
            }
            
          }
        }
        if(curTable.tbody.children.length>0){
          let curH = this.preRenderGetHeight(curTable.table);
          page.children.push(curTable.table);
          page.curHeight+=curH;
        }
      }else{
        let newPage={children:[],curHeight:0,maxHeight:maxHeight};
        pageList.push(newPage);
        newPage.children.push(dom);
        newPage.curHeight+=height;
      }
    }
    
  }
  print(){
    this.render();
    let {PAGE_HEIGHT,padding,landscape}=this.state;
    let ref = this.state.targetDom.querySelector(`#${DOM_SRC_TABLE}`);
    let pageHeight = this.mm2px(PAGE_HEIGHT)-padding-padding;
    let pageList=[{children:[],curHeight:0,maxHeight:pageHeight}];
    for(let i=0;i<ref.children.length;i++){
      this.moveDom(ref.children[i],pageList,pageHeight)
    }

    let water = this.state.water;
    let waterBox;
    if(water){
      if(water===true){
        water = document.createElement('div');
        water.className='table-print-water';
        water.innerHTML=`<span>还有下一页</span>`;
      }else{
        water = water.children[0].cloneNode(true);
      }
      waterBox = document.createElement('section');
      waterBox.className='table-print-water-box';
      waterBox.appendChild(water);

      let deg = this.rand(35,89);
      let x = this.rand(15,60);
      let y = this.rand(0,50)-25;

      waterBox.style.transform=`rotate3d(0,0,1,${deg}deg)`;
      waterBox.style.left=`${x}%`;
      waterBox.style.bottom='-'+y+'px';
    }
    
    const pageClass = landscape?'A4landscape':'A4'
    for(let i=0;i<pageList.length;i++){
      let page = document.createElement('section');
      page.className=`${DOM_SRC_TABLE} ${pageClass}`;
      page.style.padding=padding+'px';

      let headerBox = document.createElement('div');
      headerBox.className=`${DOM_HEADER}`;
      headerBox.style.padding=`0 ${padding}px`;
      let footerBox = document.createElement('div');
      footerBox.className=`${DOM_FOOTER}`;
      footerBox.style.padding=`0 ${padding}px`;

      page.appendChild(headerBox);
      page.appendChild(footerBox);
      if(this.state.header){
        let domHeader = this.state.header.cloneNode(true);
        headerBox.appendChild(domHeader);
      }

      pageList[i].children.forEach(child=>{
        page.appendChild(child);
      });

      // render footer
      if(this.state.footer){
        if(this.state.footer===true){
          this.state.footer = this.footer_default;
        }
        let domFooter = this.state.footer.cloneNode(true);
        let innerText = domFooter.innerText;
        innerText = innerText.replace('@page',i+1);
        innerText = innerText.replace('@total',pageList.length);
        domFooter.innerText=innerText;
        footerBox.appendChild(domFooter);
      }
      if(i!=pageList.length-1){
        if(water){
          page.appendChild(waterBox.cloneNode(true));
        }
      }
      this.state.targetDom.querySelector(`#${DOM_ROOT}`).appendChild(page);
    }
    ref.style.display='none';
    window.print();
    if(!this.state.debug){
      document.body.removeChild(document.querySelector('#table-print-root'));
    }
  }

  rand(min, max, seed) {
    if (!seed) {
      seed = Math.random();
    }
    var ret = Math.ceil(seed * (max - min + 1 ) - 1) + min;
    return ret;
  }

  render() {
    const {landscape,children} = this.state;
    const pageClass = landscape?'A4landscape':'A4'
    let root = document.createElement('section');
    root.className=DOM_ROOT;
    root.id=DOM_ROOT;

    let printSrc = document.createElement('section');
    printSrc.className=`${DOM_SRC_TABLE} ${pageClass}`;
    printSrc.id=DOM_SRC_TABLE;
    for(let i=0;i<children.length;i++){
      printSrc.appendChild(children[i].cloneNode(true));
    }
    root.appendChild(printSrc);
    this.state.targetDom.appendChild(root);
  }
}

export default TablePrint;
