<template>
<div  class="hello">
	<ul id = "list">
				<li v-for="item of list" :key="item.id" :id="item.id" draggable="true" @dragstart="drag($event)">{{item.content}}</li>
			</ul>
  <div data-demo-id="statemachine">
    <a style="margin:10px 0 0 10px;display:inline-block" href="https://jsplumbtoolkit.com"></a>
			
        <div class="jtk-demo-main">
            <!-- demo -->
            <div class="jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan" id="canvas" @drop="drop($event)" @dragover="allowDrop($event)">
                <div v-for="item of data" :key="item.id" class="w" :id="item.id">{{item.title}}
                    <div class="ep">line</div>
                    <div class="del" delete-all></div>
                    <div class="node-collapse"></div>
                </div>
                <!-- <div class="w" id="phone1" group="two">PHONE INTERVIEW 1
                    <div class="ep" action="phone1">line</div>
                    <div class="del" delete-all></div>
                    <div class="node-collapse"></div>
                </div>
                <div class="w" id="phone2" group="three">PHONE INTERVIEW 2
                    <div class="ep" action="phone2">line</div>
                    <div class="del" delete-all></div>
                    <div class="node-collapse"></div>
                </div>
                <div class="w" id="inperson" group="four">IN PERSON
                    <div class="ep" action="inperson">line</div>
                    <div class="del" delete-all></div>
                    <div class="node-collapse"></div>
                </div>
                <div class="w" id="rejected" group="five">REJECTED
                    <div class="ep" action="rejected">line</div>
                    <div class="del" delete-all></div>
                    <div class="node-collapse"></div>
                </div> -->
            </div>
            <!-- /demo -->
            <!-- explanation -->
            <!-- <div class="description">
                <h4>STATE MACHINE</h4>
                <p>Nodes are connected with the StateMachine connector.</p>
                <p>Endpoints are located with 'Continuous' anchors, which are anchors whose location is calculated based on
                    the location of all other connected elements, and which guarantee a unique endpoint per connection.
                </p>
                <p>Click and drag new Connections from the orange div in each element; the main elements in the UI are
                    configured to be Connection targets. You can drag from one of these divs onto its parent element to
                    create a 'loopback' connection. Each element supports up to 5 Connections.</p>
                <p>Click on a Connection to delete it.</p>
                <p>Double click on whitespace to add a new node</p>
            </div> -->
            <!-- /explanation -->
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
			list:[
				{id:'drag1', content:'元素1'},
				{id:'drag2', content:'元素2'},
				{id:'drag3', content:'元素3'},
				{id:'drag4', content:'元素4'}
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
		jsPlumb.ready(() => {
      this.createFlow(this.data);
		});
  },
  methods: {
		createFlow (flowData) {
			let _this = this
			const instance = jsPlumb.getInstance({
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
			instance.registerConnectionType("basic", { anchor:"Continuous", connector:"StateMachine" });

    	window.jsp = instance;

    	let canvas = document.getElementById("canvas");
			let windows = jsPlumb.getSelector(".statemachine-demo .w");
			
			instance.bind("click", function (c) {
				console.log(c)
        instance.deleteConnection(c);
			});
			instance.bind("connection", function (info) {
        info.connection.getOverlay("label").setLabel(info.connection.id);
    	});

   		 // bind a double click listener to "canvas"; add new node when this occurs.
			// jsPlumb.on(canvas, "dblclick", function(e) {
			// 		newNode(e.offsetX, e.offsetY);
			// });

			var initNode = function(el) {

        // initialise draggable elements.
        instance.draggable(el);

        instance.makeSource(el, {
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

        instance.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: true
        });

        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //
        instance.fire("jsPlumbDemoNodeAdded", el);
			};
			var newNode = function(x, y) {
			
				var d = document.createElement("div");
        var id = jsPlumbUtil.uuid();
        d.className = "w";
        d.id = id;
        d.innerHTML = id.substring(0, 7) + "<div class=\"ep\"></div><div class=\"del\"></div><div class=\"node-collapse\"></div>";
        d.style.left = x + "px";
        d.style.top = y + "px";
        instance.getContainer().appendChild(d);
        initNode(d);
        return d;
			};
			
			instance.batch(function () {
        for (var i = 0; i < windows.length; i++) {
            initNode(windows[i]);
        }
			});
			
    	// delete group button
			instance.on(canvas, "click", ".del", function(c) {
				instance.remove(c);
				// _this.$Modal.confirm({
        //   title: '删除确认',
        //   content: '<p>确定删除吗？</p>',
        //   onOk: () => {
				// 		_this.$Message.success('删除成功')
				// 	}
        // })
				// jsPlumb.remove("element1");
				// jsPlumb.deleteConnectionsForElement(el, [params])
			});

			// collapse/expand group button
			instance.on(canvas, "click", ".node-collapse", function() {
				_this.editModal = true
				// var g = this.parentNode.getAttribute("group"), collapsed = j.hasClass(this.parentNode, "collapsed");
				// j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
				// j[collapsed ? "expandGroup" : "collapseGroup"](g);
				
			});

			jsPlumb.fire("jsPlumbDemoLoaded", instance);
		},
		allowDrop (ev) {
			ev.preventDefault();
		},
    drag (ev) {
			ev.dataTransfer.setData("Text",ev.target.id);
			ev.dataTransfer.setData("Title",ev.target.innerHTML);
		},
		drop (ev) {
			let id = ev.dataTransfer.getData("Text");
			let data = ev.dataTransfer.getData("Title");
			let obj = {
				id:id, 
				title:data
			}
			let arr = Object.assign([],this.data)
			arr.push(obj)
			this.data=arr
			// this.data.push()
			this.list = this.list.filter(l => l.id !== id)
			
      this.createFlow(this.data);
      let w = 100 
      let l = 100 
			this.data.map(d => {
				document.getElementById(d.id).style.left = w + "px";
        document.getElementById(d.id).style.top = l + "px";
        w+= 100
        l+=100
			})
			console.log(this.data)
			// document.getElementById(id).style.left = ev.offsetX + "px";
			// document.getElementById(id).style.top = ev.offsetY + "px";
			// ev.target.appendChild(document.getElementById(data));
			ev.preventDefault();
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
	height: 100%;
}
#canvas{
	height: 600px;
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
    bottom: 37%;
    right: 5px;
    width: 1em;
    height: 1em;
    background-color: orange;
    cursor: pointer;
    box-shadow: 0 0 2px black;
    -webkit-transition: -webkit-box-shadow 0.25s ease-in;
    -moz-transition: -moz-box-shadow 0.25s ease-in;
    transition: box-shadow 0.25s ease-in;
}

.ep:hover {
    box-shadow: 0 0 6px black;
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
    background-color:#ccc;
    padding:1px;
    cursor:pointer;
    font-size:13px;
    width:20px;
    height:20px;
    border-radius: 50%;
    text-align:center;
    display:block;
}
.del:after {
    content:"X";
}

.node-collapse {
    left:2px;
    text-align: center;
}

.node-collapse:after {
    content:"-";
}

.group-container.collapsed .node-collapse:after {
    content:"+";
}

.del[delete-all] {
    background-color: pink;
}
#list {
	list-style: none;
	padding: 0;
	margin: 0;
	border:1px solid #ddd;
	position: fixed;
	right: 0;
	top: 0;
	width: 200px;
	height: 100%;
}
#list li{
	height: 40px;
	line-height: 40px;
	padding-left: 20px;
	border-bottom: 1px solid #ddd;
	cursor: pointer;
	background-color: #fff;
}
</style>
