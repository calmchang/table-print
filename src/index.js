import './index.scss';

const __PAGE_W=210;
const __PAGE_H=294;

const __PAGE_LAND_W=297;
const __PAGE_LAND_H=171;


const A4_HEIGHT=__PAGE_H;
const A4_WIDTH=__PAGE_W;

const A4_LANDSCAPE_WIDTH=__PAGE_LAND_W;
const A4_LANDSCAPE_HEIGHT=__PAGE_LAND_H;

const DOM_ROOT='table-print-root';
const DOM_SRC_TABLE='table-print-src';
const DOM_HEADER='table-print-header';
const DOM_FOOTER='table-print-footer';

class TablePrint{
  constructor({
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
    this.dialog=null;
  }
  mm2px(mm) {
    let targetDom = document.querySelector(`#${DOM_SRC_TABLE}`);
    var tmpNode = document.createElement('div');
    tmpNode.style.cssText = `width:1mm;height:${mm}mm;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden`;
    targetDom.appendChild(tmpNode);
    let h = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
    console.log(`${mm}->${h}px`)
    return h;
  }
  preRenderGetHeight(dom) {
    let targetDom = document.querySelector(`#${DOM_SRC_TABLE}`);

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

    const addNewPage=(pageList,dom,height,maxHeight)=>{
      let newPage={children:[],curHeight:0,maxHeight:maxHeight};
      pageList.push(newPage);
      newPage.children.push(dom);
      newPage.curHeight+=height;
    }
    if(dom.style.pageBreakBefore==='always'){
      addNewPage(pageList,dom,height,maxHeight);
      return;
    }

    if(page.curHeight + height < maxHeight){
      page.children.push(dom);
      page.curHeight+=height;
      return;
    }

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
      addNewPage(pageList,dom,height,maxHeight)
    }
    
    
  }

  debugPrint(){
    let root = document.createElement('section');
    root.className=DOM_ROOT;
    root.id=DOM_ROOT;
    this.state.targetDom.appendChild(root);

    const borderConfig=[
      ['red','green'],
      ['blue','black']
    ]
    // let ref = this.state.targetDom.querySelector(`#${DOM_SRC_TABLE}`);
    // let {landscape}=this.state;
    let landscape=false;
    const pageClass = landscape?'A4landscape':'A4'
    for(let i=0;i<3;i++){
      let page = document.createElement('section');
      page.className=`${DOM_SRC_TABLE} ${pageClass}`;
      // page.style.border=`5mm solid ${borderConfig[i%2][0]}`;
      page.style.padding="5mm";

      let content = document.createElement('div');
      // content.style.border=`1px solid ${borderConfig[i%2][1]}`;
      // content.style.width='100%';
      // content.style.height='100%';
      // content.className='content';
      // content.innerText = `${i}:5mm bottom 5mm`;
      // page.append(content);
      page.innerText='1231'

      root.appendChild(page);
    }

    window.print();

    // ref.style.display='none';
   
  }

  print(review=false){
    let printRoot = this.createPrintRootDom(review);
    this.showDialog(printRoot,review);


    let {PAGE_HEIGHT,landscape}=this.state;
    let ref = document.querySelector(`#${DOM_SRC_TABLE}`);
    let pageHeight = landscape?this.mm2px(PAGE_HEIGHT-30-30):this.mm2px(PAGE_HEIGHT-30-15);
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

      let headerBox = document.createElement('div');
      headerBox.className=`${DOM_HEADER}`;
      let footerBox = document.createElement('div');
      footerBox.className=`${DOM_FOOTER}`;

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
      this.dialog.querySelector(`#${DOM_ROOT}`).appendChild(page);
    }
    ref.style.display='none';

    if(!review){
      this.doPrint();
      return;
    }


  }

  rand(min, max, seed) {
    if (!seed) {
      seed = Math.random();
    }
    var ret = Math.ceil(seed * (max - min + 1 ) - 1) + min;
    return ret;
  }

  closeDialog(){
    if(!this.dialog)return;
    document.body.removeChild(this.dialog);
    this.dialog=null;
  }

  doPrint(){
    let printDom = document.querySelector('#table-print-root');
    document.body.appendChild(printDom);
    this.closeDialog();
    window.print();
    document.body.removeChild(printDom);
    
  }
  showDialog(dom,review){
    let root = document.createElement('section');
    root.className='table-print-dialog';
    root.id='table-print-dialog';
   
    this.dialog=root;

    var btnGroup = document.createElement('hgroup');
    btnGroup.className="table-print-dialog-btn-group";

    var btnCancel = document.createElement('div');
    btnCancel.className='table-print-dialog-btn-cancel';
    btnCancel.innerText='取消'

    var btnOk = document.createElement('div');
    btnOk.className='table-print-dialog-btn-ok';
    btnOk.innerText='打印'
    
    var btnCancel = document.createElement('div');
    btnCancel.className='table-print-dialog-btn-cancel';
    btnCancel.innerText='取消'

    btnGroup.appendChild(btnOk);
    btnGroup.appendChild(btnCancel);

    var title = document.createElement('div');
    title.className='table-print-dialog-title';
    title.innerText='打印预览'
    root.appendChild(title);
    root.appendChild(btnGroup);
    root.appendChild(dom);

    btnOk.onclick=()=>{
      this.doPrint();
    }
    btnCancel.onclick=()=>{
      this.closeDialog();
    }
    
    document.body.appendChild(root);

  }
  createPrintRootDom() {
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

    return root;
    // this.state.targetDom.appendChild(root);
  }
}

export default TablePrint;
