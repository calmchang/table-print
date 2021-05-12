import './index.scss';


const DOM_ROOT='table-print-root';
const DOM_SRC_TABLE='table-print-src';


class TablePrint{
  constructor({
    landscape=false,
    footer=null,
    header=null,
    children=[],
    water=null,
    debug=false,
    waterHeight=0
    }) {
    
    this.state={
      landscape,
      children,
      footer,
      header,
      water,
      debug,
      waterHeight
    };
    this.footer_default = document.createElement('p');
    this.footer_default.className="table-print-footer-content";
    this.footer_default.innerHTML=`@page/@total`;
    this.dialog=null;
    this.oldPageSize=null;
  }
  
  getDomHeight(dom){
    let height = dom.offsetHeight;

    let currentStyle = dom.currentStyle||document.defaultView.getComputedStyle(dom);
    let marginTop = currentStyle['marginTop'].match(/(\d+)/g);
    marginTop = marginTop?+marginTop[0]:0;
    let marginBottom = currentStyle['marginBottom'].match(/(\d+)/g);
    marginBottom = marginBottom?+marginBottom[0]:0;
    height+=marginTop+marginBottom;

    return height;
  }
  //将mm单位转换为px单位
  mm2px(mm) {
    let targetDom = document.querySelector(`#${DOM_SRC_TABLE}`);
    var tmpNode = document.createElement('div');
    tmpNode.style.cssText = `width:1mm;height:${mm}mm;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden`;
    targetDom.appendChild(tmpNode);
    let h = this.getDomHeight(tmpNode);
    tmpNode.parentNode.removeChild(tmpNode);
    return h;
  }

  //计算这个dom绘制后会占用多少高度px
  preRenderGetHeight(dom) {
    let targetDom = document.querySelector(`#${DOM_SRC_TABLE}`);

    var tmpNode = document.createElement('div');
    tmpNode.style.cssText = `position:absolute;left:0px;top:0px;z-index:99;visibility:hidden`;
    tmpNode.appendChild(dom);
    targetDom.appendChild(tmpNode);
    let h = this.getDomHeight(tmpNode);
    tmpNode.parentNode.removeChild(tmpNode);
    return h;
  }
  
  getThead(dom){
    if(dom.children[0]&&dom.children[0].nodeName.toLocaleLowerCase()==='thead'){
      return dom.children[0];
    }
    return null;
  }
  getTBody(dom){
    if(dom.children[1].nodeName&&dom.children[1].nodeName.toLocaleLowerCase()==='tbody'){
      return dom.children[1];
    }
    return null;
  }

  moveDom(dom,pageList,maxHeight){
    let height =this.getDomHeight(dom);
    
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

    if(dom.nodeName.toLocaleLowerCase()==='table' && this.getThead(dom) ){
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

  //根据打印要求是横向还是竖向，切换@page内页面size配置
  setPageLandscape(landscape){
    var size;
    var styles;
    for(var i=0;i<document.styleSheets.length;i++){
      var sheets = document.styleSheets[i];
      for(var j=0;j<sheets.cssRules.length;j++){
        styles = sheets.cssRules[j];
        if(styles&&styles.constructor===CSSPageRule){
          size = styles.style.size;
          break;
        }
      }
      if(size){
        break;
      }
    }
    size = [...size.matchAll(/(\d+)/g)]

    size = size.map(item=>{
      return +item[1];
    });

    if(landscape){
      if(size[0]<size[1]){
        size.reverse();
      }
    }else{
      if(size[0]>size[1]){
        size.reverse();
      }
    }
    size = size.map(item=>{
      return item+'mm';
    })
    styles.style.size=size.join(' ');

  }
  // 打印：review是否打印前弹出预览查看框
  print(review=false){
    let {landscape}=this.state;
      
    this.setPageLandscape(landscape);

    let printRoot = this.createPrintRootDom(review);
    this.showDialog(printRoot,review);
    
    let ref = document.querySelector(`#${DOM_SRC_TABLE}`);

    let headerBox = document.createElement('header');
    let headerHeight=0;
    if(this.state.header){
      let domHeader = this.state.header.cloneNode(true);
      headerBox.appendChild(domHeader);
     
      headerHeight =  this.preRenderGetHeight(headerBox);
    }
    
    let pageHeight = landscape?this.mm2px(209-15-15-1):this.mm2px(296-15-15-1);
    pageHeight -= headerHeight;

    


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
      let h = water.offsetHeight||water.height||this.state.waterHeight;
      waterBox.style.transform=`rotate3d(0,0,1,${deg}deg)`;
      waterBox.style.left=`${x}%`;
      waterBox.style.bottom='-'+h/2+'px';
    }
    
    for(let i=0;i<pageList.length;i++){


      let a4 = document.createElement('section');
      a4.className=`A4`;
      let page = document.createElement('div');
      page.className=`A4-content`;
      a4.appendChild(page);

      
      let footerBox = document.createElement('footer');

      
     
      if(this.state.header){
        page.appendChild(headerBox.cloneNode(true));
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
        page.appendChild(footerBox);
      }
      if(i!=pageList.length-1){
        if(water){
          page.appendChild(waterBox.cloneNode(true));
        }
      }
      this.dialog.querySelector(`#${DOM_ROOT}`).appendChild(a4);
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
    if(!this.state.debug){
      document.body.removeChild(printDom);
    }
    
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
    const {children,landscape} = this.state;

    let root = document.createElement('section');
    root.className=DOM_ROOT;
    root.id=DOM_ROOT;
    if(landscape){
      root.setAttribute('landscape',true);
    }else{
      root.removeAttribute('landscape');
    }


    let printSrc = document.createElement('section');
    printSrc.className=DOM_SRC_TABLE;
    printSrc.id=DOM_SRC_TABLE;
    for(let i=0;i<children.length;i++){
      printSrc.appendChild(children[i].cloneNode(true));
    }
    root.appendChild(printSrc);
    return root;
  }
}

export default TablePrint;
