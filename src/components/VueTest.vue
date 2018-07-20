<template>
<div  class="hello">
  <div class="Menu" id="list">
      <div class="header-box_logo">
        <p class="header-logo_text">
           测试主题
        </p>
      </div>
      <div class="menu_wrap">
        <Collapse>
          <Panel v-for="item of menu" :key="item.name">
              {{item.name}}
              <ul slot="content" :style="{'maxHeight':clientHeight + 'px', 'overflow-y':'scroll'}">
                  <li v-for="i of item.children" :key="i.name" :id="i.id" draggable="true" @dragstart="drag($event)">{{i.name}}</li>
              </ul>
          </Panel>
      	</Collapse>
      </div>

  </div>
  <div data-demo-id="statemachine" class="statemachine">
    <div class="jtk-demo-main">
        <div class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan" id="canvas" @drop="drop($event)" @dragover="allowDrop($event)">
            <div v-for="item of data" :key="item.id" class="w" :id="item.id">{{item.title}}
                <div class="ep"></div>
                <div class="del" delete-all><Icon type="ios-close" size="20"></Icon></div>
                <div class="node-collapse"><Icon type="ios-cog" size="20"></Icon></div>
            </div>
        </div>
    </div>
  </div>
	<Modal v-model="editModal" title="测试添加" :transfer='true'>
					<Input v-model="testInput" placeholder="请输入"></Input>
					<div slot="footer">
						<Button type="primary" long>确定</Button>
					</div>
				</Modal>
	</div>
</template>

<script>
import { jsPlumb } from 'jsplumb'
export default {
  name: 'HelloWorld',
  data () {
    return {
			instance: null,
			clientHeight : 0,
      menu: [
          {
            name: '输入',
            children: [
              {
                id: 'input1',
                name: 'Access输入'
              },
              {
                id: 'input2',
                name: 'CSV文件输入'
              },
              {
                id: 'input3',
                name: 'Cube文件输入'
              },
              {
                id: 'input4',
                name: 'Excel输入'
              },
              {
                id: 'input5',
                name: 'Gzip CSV Input'
              },
              {
                id: 'input6',
                name: 'Google Analytics'
              },
              {
                id: 'input7',
                name: 'HL7 Input'
              },
              {
                id: 'input8',
                name: 'LDAP 输入'
              },
              {
                id: 'input9',
                name: 'LDIF 输入'
              },
              {
                id: 'input10',
                name: 'Mondrian 输入'
              },
              {
                id: 'input11',
                name: 'OLAP 输入'
              },
              {
                id: 'input12',
                name: 'RSS 输入'
              },
              {
                id: 'input13',
                name: 'SAS 输入'
              },
              {
                id: 'input14',
                name: 'Salesforce Input'
              },
              {
                id: 'input15',
                name: 'XBase 输入'
              },
              {
                id: 'input16',
                name: 'Yaml 输入'
              },
              {
                id: 'input17',
                name: '固定宽度文件输入'
              },
              {
                id: 'input18',
                name: '文件内容加载至内存'
              },
              {
                id: 'input19',
                name: '文本文件输入'
              },
              {
                id: 'input20',
                name: '生成记录'
              },
              {
                id: 'input21',
                name: '生成随机数'
              },
              {
                id: 'input22',
                name: '生成随机的行用卡号'
							},
							{
                id: 'input23',
                name: '自定义常量数据'
							},
							{
                id: 'input24',
                name: '获取子目录名'
							},
							{
                id: 'input25',
                name: '获取文件名'
							},
							{
                id: 'input26',
                name: '获取文件行数'
							},
							{
                id: 'input27',
                name: '获取系统信息'
							},
							{
                id: 'input28',
                name: '获取表名'
							},
							{
                id: 'input29',
                name: '获取资源库配置'
							},
							{
                id: 'input30',
                name: '表输入'
							},
							{
                id: 'input31',
                name: '邮件信息输入'
							},
							{
                id: 'input32',
                name: '配置文件输入'
							}
            ]
          },
          {
            name: '输出',
            children: [
              {
                id: 'output1',
                name: 'Access输出'
              },
              {
                id: 'output2',
                name: 'Cube输出'
              },
              {
                id: 'output3',
                name: 'Excel输出'
              },
              {
                id: 'output4',
                name: 'LDAP 输出'
              },
              {
                id: 'output5',
                name: 'Microsoft Excel 输出'
              },
              {
                id: 'output6',
                name: 'Pentaho 报表输出'
              },
              {
                id: 'output7',
                name: 'RSS 输出'
              },
              {
                id: 'output8',
                name: 'S3 File Output'
              },
              {
                id: 'output9',
                name: 'SQL 文件输出'
              },
              {
                id: 'output10',
                name: 'Salesforce Delete'
              },
              {
                id: 'output11',
                name: 'Salesforce Insert'
              },
              {
                id: 'output12',
                name: 'Salesforce Update'
              },
              {
                id: 'output13',
                name: 'Salesforce Upsert'
              },
              {
                id: 'output14',
                name: 'Text file output(legacy)'
              },
              {
                id: 'output15',
                name: '删除'
              },
              {
                id: 'output16',
                name: '插入/更新'
              },
              {
                id: 'output17',
                name: '数据同步'
              },
              {
                id: 'output18',
                name: '文本文件输出'
              },
              {
                id: 'output19',
                name: '更新'
              },
              {
                id: 'output20',
                name: '自动文档输出'
              },
              {
                id: 'output21',
                name: '表输入'
							},
							{
                id: 'output21',
                name: '配置文件输出'
              }
            ]
          },
        ],
			list:[
				{id:'drag1', content:'元素1'},
				{id:'drag2', content:'元素2'},
				{id:'drag3', content:'元素3'},
				{id:'drag4', content:'元素4'},
				{id:'drag5', content:'元素5'},
				{id:'drag6', content:'元素6'}
			],
			editModal: false,
			testInput: '',
			data:[
				// {id:'opened', group:'one', title:'表1'},
				// {id:'phone1', group:'two', title:'表2'},
				// {id:'phone2', group:'three', title:'表3'},
				// {id:'inperson', group:'four', title:'表4'},
				// {id:'rejected', group:'five', title:'表5'}
			],
    }
  },
  created () {
	
  },
  mounted(){
		this.clientHeight = document.body.clientHeight
		jsPlumb.ready(() => {
      this.initInstance();
		});
  },
  methods: {
    initInstance() {
			let _this = this
      this.instance = jsPlumb.getInstance({
        Endpoint: ["Dot", {radius: 2}],
        Connector:"StateMachine",
        HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 },
        ConnectionOverlays: [
            [ "Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 0.8
            } ],
            [ "Label", { label: "FOO", id: "label", cssClass: "aLabel" }]
        ],
        Container: "canvas"
      });
      let that = this
      this.instance.registerConnectionType("basic", { anchor:"Continuous", connector:"StateMachine" });
      this.instance.bind("click", function (c) {
        that.instance.deleteConnection(c);
			});
			this.instance.bind("connection", function (info) {
        info.connection.getOverlay("label").setLabel(info.connection.id);
			});

			this.instance.on(canvas, "click", ".del", function(c) {
				let id = c.path[2].id
				_this.$Modal.confirm({
          title: '删除确认',
          content: '<p>确定删除吗？</p>',
          onOk: () => {
						_this.deleteElem(id)
					}
        })
			});
			// collapse/expand group button
			this.instance.on(canvas, "click", ".node-collapse", function() {
				_this.editModal = true
				// var g = this.parentNode.getAttribute("group"), collapsed = j.hasClass(this.parentNode, "collapsed");
				// j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
				// j[collapsed ? "expandGroup" : "collapseGroup"](g);

			});

		},
		deleteElem (id) {
			this.instance.deleteConnectionsForElement(id)
			this.data = this.data.filter(d => d.id !== id)
			let node = ''
			this.data.map(d => {
				node = document.getElementById(d.id)
				this.initNode(node)
			})
			this.$Message.success('删除成功')
		},
    newNode(x, y) {
      var d = document.createElement("div");
        var id = jsPlumbUtil.uuid();
        d.className = "w";
        d.id = id;
        d.innerHTML = id.substring(0, 7) + "<div class=\"ep\"></div><div class=\"del\"></div><div class=\"node-collapse\"></div>";
        d.style.left = x + "px";
        d.style.top = y + "px";
        this.instance.getContainer().appendChild(d);
        this.initNode(d);
    },
    initNode(el) {
      this.instance.draggable(el);
      this.instance.makeSource(el, {
          filter: ".ep",
          anchor: "Continuous",
          connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
          connectionType:"basic",
          extract:{
              "action":"the-action"
          },
          // maxConnections: 2,
          onMaxConnections: function (info, e) {
              alert("Maximum connections (" + info.maxConnections + ") reached");
          }
      });

      this.instance.makeTarget(el, {
          dropOptions: { hoverClass: "dragHover" },
          anchor: "Continuous",
          allowLoopback: true
      });

      // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
      // version of this demo to find out about new nodes being added.
      //
      this.instance.fire("jsPlumbDemoNodeAdded", el);
    },
		allowDrop (ev) {
			ev.preventDefault();
		},
    drag (ev) {
			ev.dataTransfer.setData("Text",ev.target.id);
			ev.dataTransfer.setData("Title",ev.target.innerHTML);
		},
		drop (ev) {
      // this.newNode(Math.random * 100, Math.random * 100)
			let id = ev.dataTransfer.getData("Text");
			let data = ev.dataTransfer.getData("Title");
			let obj = {
				id: 'test' + id + Math.random(),
				title:data
			}
			let arr = Object.assign([],this.data)
			arr.push(obj)
			this.data=arr
			// this.data.push()
			// this.list = this.list.filter(l => l.id !== id)
      let w = 200
      let l = 200
      // this.instance.draggable(obj.id)
      let node = null
      let that = this
      let timer = setTimeout(function(){
				let node = document.getElementById(obj.id)
				// console.log(node)
				node.style.left = ev.pageX + "px";
				node.style.top = ev.pageY + "px";
				that.initNode(node)
        clearTimeout(timer)
			}, 100)
      // node.style.left = w + "px";
      // node.style.left = l + "px";
      // console.log(node)
      // this.initNode(node)
			// document.getElementById(id).style.left = ev.offsetX + "px";
			// document.getElementById(id).style.top = ev.offsetY + "px";
			// ev.target.appendChild(document.getElementById(data));
			ev.preventDefault();
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped >
.hello{
	height: 100%;
	overflow: hidden;
}
#canvas{
	height: 800px;
}
.demo {
    /* for IE10+ touch devices */
    touch-action:none;
}

.w {
    padding: 30px;
    position: absolute;
    z-index: 4;
    border: 1px solid #2e6f9a;
    box-shadow: 2px 2px 19px #e0e0e0;
    -o-box-shadow: 2px 2px 19px #e0e0e0;
    -webkit-box-shadow: 2px 2px 19px #e0e0e0;
    -moz-box-shadow: 2px 2px 19px #e0e0e0;
    -moz-border-radius: 8px;
    border-radius: 8px;
    opacity: 0.8;
    cursor: move;
    background-color: white;
    font-size: 11px;
    -webkit-transition: background-color 0.25s ease-in;
    -moz-transition: background-color 0.25s ease-in;
    transition: background-color 0.25s ease-in;
}

.w:hover {
    background-color: #5c96bc;
    color: white;

}

.aLabel {
    -webkit-transition: background-color 0.25s ease-in;
    -moz-transition: background-color 0.25s ease-in;
    transition: background-color 0.25s ease-in;
}

.aLabel.jtk-hover, .jtk-source-hover, .jtk-target-hover {
    background-color: #1e8151;
    color: white;
}

.aLabel {
    background-color: white;
    opacity: 0.8;
    padding: 0.3em;
    border-radius: 0.5em;
    border: 1px solid #346789;
    cursor: pointer;
}

.ep {
    position: absolute;
    bottom: 5px;
    right: 5px;
    /* width: 1em;
    height: 1em; */
    /* background-color: orange; */
    background: url(../assets/imgs/line.png) no-repeat center center;
    width:18px;
    height:18px;
    border-radius: 50%;
    text-align:center;
    cursor: pointer;
    box-shadow: 0 0 2px black;
    -webkit-transition: -webkit-box-shadow 0.25s ease-in;
    -moz-transition: -moz-box-shadow 0.25s ease-in;
    transition: box-shadow 0.25s ease-in;
}

.ep:hover {
    box-shadow: 0 0 6px black;
}
.statemachine{
	height: 100%;
}
.statemachine-demo .jtk-endpoint {
    z-index: 3;
}

#opened {
    left: 10em;
    top: 5em;
}

#phone1 {
    left: 35em;
    top: 12em;
    width: 7em;
}

#inperson {
    left: 12em;
    top: 23em;
}

#phone2 {
    left: 28em;
    top: 24em;
}

#rejected {
    left: 10em;
    top: 35em;
}

.dragHover {
    border: 2px solid orange;
}

path, .jtk-endpoint { cursor:pointer; }

.del, .node-collapse {
    position:absolute;
    top:2px;
    right:2px;
    /* background-color:#ccc; */
    padding:1px;
    cursor:pointer;
    font-size:13px;
    width:20px;
    height:20px;
    border-radius: 50%;
    text-align:center;
    display:block;
}
/* .del:after {
    content:"X";
} */

.node-collapse {
    left:2px;
    text-align: center;
}

/* .node-collapse:after {
    content:"-";
} */

/* .group-container.collapsed .node-collapse:after {
    content:"+";
} */

/* .del[delete-all] {
    background-color: pink;
} */
#list {
	list-style: none;
	padding: 0;
	margin: 0;
	border:1px solid #ddd;
	position: fixed;
	left: 0;
	width: 200px;
	height: 100%;
}
#list li{
	height: 40px;
	line-height: 40px;
	padding-left: 30px;
	border-bottom: 1px solid #ddd;
	cursor: pointer;
	background-color: #fff;
}
.header-box_logo {
    background-color: #255473;
    float: left;
    width: 200px;
    height: 60px;
    text-align: center;
    // .header-logo_icon {
    //   float: left;
    //   width: 45px;
    //   height: 40px;
    //   background: url('../../assets/images/main-logo.png') center no-repeat;
    //   margin: 10px 20px;
    // }
    .header-logo_text {
      color: #fff;
      margin-top: 25px;
      font-size: 14px;
      font-weight: 900;
    }
  }
  .menu_wrap{
    margin-top: 60px;
	}
	
</style>
<style>
	/* .ivu-collapse-content{
		min-height: 400px;
	} */
	.ivu-collapse-content>.ivu-collapse-content-box{
		padding-top: 0;
	}
	/* .ivu-collapse-content>.ivu-collapse-content-box ul{
		
	} */
	.ivu-collapse-header {
    padding-left: 22px;
	}
	.ivu-collapse-content{
		padding: 0;
	}
 </style>
 
 
