/*!
 * hearing-record.js v1.0.6
 * Released under the MIT License.
 */
var hearingRecord = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"contenteditable-wrap",style:({ background: 'url(' + _vm.linebg + ') repeat' })},[_c('canvas',{ref:"canvas",staticClass:"canvas"}),_vm._v(" "),_vm._l((_vm.filterList),function(item,index){return _c('div',{key:item.key,ref:'contenteditable' + index,refInFor:true,staticClass:"contenteditable",class:{ quesition: item.type == 1, answer: item.type == 2 },style:({ lineHeight: _vm.lineHeight + 'px' }),attrs:{"contenteditable":"true","index":index},on:{"input":function($event){return _vm.handleInputEvent($event, index)},"blur":function($event){return _vm.handleBlurEvent($event, index)},"keydown":function($event){return _vm.addItem($event, index)}}},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(item.type == 1 || item.type == 2),expression:"item.type == 1 || item.type == 2"}],staticClass:"left"},[_vm._v(_vm._s(item.type == 1 ? '问：' : item.type == 2 ? '答：' :
                ''))]),_vm._v(" "),_c('div',{staticClass:"con"},[_vm._v(_vm._s(item.str))])])})],2)])},
staticRenderFns: [],
    name: 'hearing-record',
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data: function () {
        return {
            linebg: '',
            lineHeight: 30,
            currentIndex: -1
        }
    },
    computed: {
        filterList() {
            let newlist = [];
            const patt1 = /^问\：.*/g;
            const patt2 = /^答\：.*/g;

            this.list.forEach(element => {
                if (element.match(patt1)) {
                    newlist.push({
                        str: element.replace(/^问\：/, ''),
                        type: 1,
                        key: parseInt(Math.random() * 1000 + 1)
                    });
                } else if (element.match(patt2)) {
                    newlist.push({
                        str: element.replace(/^答\：/, ''),
                        type: 2,
                        key: parseInt(Math.random() * 1000 + 1)
                    });
                } else if (element) {
                    newlist.push({
                        str: element,
                        type: 3,
                        key: parseInt(Math.random() * 1000 + 1)
                    });
                }
            });
            return newlist
        }
    },
    methods: {
        handleInputEvent(e, index) {
            // 此时 dataCopy 获取的内容即为可编辑DIV中动态输入的值
            // 注意：不能将 dataCopy 赋值给可编辑输入框绑定的值 data，否则重新赋值会使输入框的光标跑到最前面！！！

        },
        // 当光标失去焦点（也就是点击提交按钮的时候）给data赋值最后输入结果即可
        handleBlurEvent(event, index) {
            let html = event.target.innerHTML.trim().replace(/<.*?>/ig, "");
            let item = this.list[index];
            if (item == '' || html == '') {
                this.list.splice(index, 1);
            }
            else if (item !== html) { this.list.splice(index, 1, html); }

        },
        initCancas() {
            var canvas = this.$refs.canvas;
            if (!canvas) {
                return false;
            } else {
                let width = window.innerWidth;
                let height = this.lineHeight;
                canvas.width = width;
                canvas.height = height;
                let ctx = canvas.getContext("2d");
                ctx.moveTo(0, height);
                ctx.lineTo(canvas.width, height);
                ctx.lineWidth = '0.5';
                ctx.strokeStyle = 'blue';
                ctx.stroke();
                this.linebg = ctx.canvas.toDataURL();
            }
        },
        addItem(event, index) {
            if (event.keyCode == 13) {
                event.preventDefault();//禁用回车的默认事件
                let item = this.filterList[index];
                if (item.type == 2) {
                    this.list.splice(index + 1, 0, '问：');
                } else {
                    this.list.splice(index + 1, 0, '答：');
                }
                this.$refs['contenteditable' + index][0].blur();
                this.$nextTick(() => {
                    this.keepLastIndex(this.$refs['contenteditable' + (index + 1)][0]);
                });
            }
        },
        keepLastIndex(obj) {

            if (window.getSelection) {//ie11 10 9 ff safari
                obj.focus(); //解决ff不获取焦点无法定位问题
                var range = window.getSelection();//创建range
                range.selectAllChildren(obj);//range 选择obj下所有子内容
                range.collapseToEnd();//光标移至最后
            }
            else if (document.selection) {//ie10 9 8 7 6 5
                var range = document.selection.createRange();//创建选择对象
                //var range = document.body.createTextRange();
                range.moveToElementText(obj);//range定位到obj
                range.collapse(false);//光标移至最后
                range.select();
            }

        },
        pasteHtmlAtCaret(html) {
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // non-standard and not supported in all browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        },
        showQuesition(event, index) {
            if (this.currentIndex !== index) {
                this.currentIndex = index;
            }
        },
        addQuesition(event, index) {
            let list = this.quesitionList[index];
            let cindex = this.list.length, isSame = false;
            this.list.forEach((c, index) => {
                if (c == ('问：' + list[0])) {
                    layer.confirm('已经加过同样的问题，还要加吗?', { icon: 3, title: '提示' }, (index) => {
                        //do something
                        this.list.splice(cindex, 0, '问：' + list[0], '答：' + list[1]);
                        layer.close(index);
                    });
                    isSame = true;

                }
            });
            if (!isSame) this.list.splice(cindex, 0, '问：' + list[0], '答：' + list[1]);
            return;

        }
    },
    mounted() {
        this.initCancas();
    }
};

hearingRecord.install = function (Vue) {
  Vue.component(hearingRecord.name, hearingRecord);
};

export { hearingRecord as default };
