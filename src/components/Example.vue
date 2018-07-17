<template>
  <div class="hello" data-demo-id="groups">
     <a style="margin:10px 0 0 10px;display:inline-block" href="https://jsplumbtoolkit.com"></a>

        <div class="jtk-demo-main">
            <!-- demo -->
            <div class="jtk-demo-canvas canvas-wide flowchart-demo jtk-surface jtk-surface-nopan" id="canvas">

                <div v-for="item of data" class="group-container" :id="item.id" :group="item.group" :key="item.id">
                    <div class="title">{{item.title}}</div>
                    <ul>
                        <li v-for="code of item.codeList" :key="code.id">{{code.id}}-{{code.name}}</li>
                    </ul>
                    <div class="del" delete-all></div>
                    <div class="node-collapse"></div>
                    <div v-for="box of item.children" :key="box.id" :id="box.id" class="w" :style="{left:box.left+'px',top:box.top+'px'}">{{box.id}}</div>
                </div>
                <div class="w" id="standalone" style="left:455px;top:280px" title="drag me into a group. if you want to.">?</div>

                <div class="events"><h3>Events</h3><div id="events"></div></div>
            </div>
            <!-- /demo -->
            <!-- explanation -->
            <!-- <div class="description">
                <h4>GROUPS</h4>
                <p>Demonstrates all of the ways you can use Groups.</p>
            </div> -->
            <!-- /explanation -->
        </div>
  </div>   
</template>

<script>
import { jsPlumb } from 'jsplumb'
export default {
  name: 'HelloWorld',
  data () {
    return {
      data:[
				{id:'container1', group:'one', title:'表1', codeList:[{id:"1",name:'name'},{id:"2",name:'time'}], children:[{id:'c1_1',left:'80',top:'80'},{id:'c1_2',left:'160',top:'140'}]},
				{id:'container2', group:'two', title:'表2', codeList:[{id:"1",name:'creat_date'},{id:"2",name:'modify_date'}], children:[{id:'c2_1',left:'80',top:'35'},{id:'c2_2',left:'150',top:'160'}]},
				{id:'container3', group:'three', title:'表3', codeList:[{id:"1",name:'age'},{id:"2",name:'hobby'}], children:[{id:'c3_1',left:'80',top:'80'},{id:'c3_2',left:'80',top:'162'}]},
				{id:'container4', group:'four', title:'表4', codeList:[{id:"1",name:'type'},{id:"2",name:'status'}], children:[{id:'c4_1',left:'80',top:'80'},{id:'c4_2',left:'110',top:'150'}]},
				{id:'container5', group:'five', title:'表5', codeList:[{id:"1",name:'remark'},{id:"2",name:'tips'}], children:[{id:'c5_1',left:'140',top:'80'},{id:'c5_2',left:'140',top:'130'}]},
				{id:'container6', group:'six', title:'表6', codeList:[{id:"1",name:'appId'},{id:"2",name:'appName'}], children:[{id:'c6_1',left:'160',top:'45'},{id:'c6_2',left:'30',top:'150'}]},
				{id:'container7', group:'seven', title:'表7', codeList:[{id:"1",name:'code'},{id:"2",name:'codeName'}], children:[{id:'c7_1',left:'80',top:'120'},{id:'c7_2',left:'90',top:'150'}]},
			]
    }
  },
  created () {

  },
  mounted(){
    jsPlumb.ready(function () {
      var j = window.j = jsPlumb.getInstance({Container:canvas, Connector:"StateMachine", Endpoint:["Dot", {radius:3}], Anchor:"Center"});
			j.bind("connection", function(p) {
        p.connection.bind("click", function() {
          j.detach(this);
        });
			});
    	var evts = document.querySelector("#events");
      var _appendEvent = function(name, detail) {
        evts.innerHTML = "<br/><strong>" + name + "</strong><br/> " + detail + "<br/>" + evts.innerHTML;
    	};
    	j.bind("group:addMember", function(p) {
        _appendEvent("group:addMember", p.group.id + " - " + p.el.id);
    	});
    	j.bind("group:removeMember", function(p) {
        _appendEvent("group:removeMember", p.group.id + " - " + p.el.id);
    	});
    	j.bind("group:expand", function(p) {
        _appendEvent("group:expand", p.group.id);
    	});
    	j.bind("group:collapse", function(p) {
        _appendEvent("group:collapse", p.group.id);
    	});
    	j.bind("group:add", function(p) {
        _appendEvent("group:add", p.group.id);
    	});
    	j.bind("group:remove", function(p) {
        _appendEvent("group:remove", p.group.id);
    	});

    // connect some before configuring group
    	j.connect({source:c1_1, target:c2_1});
    	j.connect({source:c2_1, target:c3_1});
    	j.connect({source:c2_2, target:c6_2});
    	j.connect({source:c3_1, target:c4_1});
    	j.connect({source:c4_1, target:c5_1});
    	j.connect({source:c1_1,target:c1_2});
    	j.connect({source:c2_1,target:c2_2});

    // NOTE ordering here. we make one draggable before adding it to the group, and we add the other to the group
    //before making it draggable. they should both be constrained to the group extents.
    	j.draggable(c1_1);
			j.addGroup({
					el:container1,
					id:"one",
					constrain:true,
					anchor:"Continuous",
					endpoint:"Blank",
					droppable:false
			});
			j.addToGroup("one", c1_1);
			j.addToGroup("one", c1_2);
			j.draggable(c1_2);
    	j.draggable(c2_1);
			j.addGroup({
					el:container2,
					id:"two",
					dropOverride:true,
					endpoint:["Dot", { radius:3 }]
			});  //(the default is to revert)
			j.addToGroup("two", c2_1);
			j.addToGroup("two", c2_2);
    	j.draggable(c2_2);

    	j.draggable(c3_1);
    	j.addGroup({
        el:container3,
        id:"three",
        revert:false,
        endpoint:["Dot", { radius:3 }]
    	});
			j.addToGroup("three", c3_1);
			j.addToGroup("three", c3_2);
			j.draggable(c3_2);

			j.draggable(c4_1);
			j.addGroup({
					el:container4,
					id:"four",
					prune:true,
					endpoint:["Dot", { radius:3 }]
			});
			j.addToGroup("four", c4_1);
			j.addToGroup("four", c4_2);
			j.draggable(c4_2);

			j.draggable(c5_1);
			j.addGroup({
					el:container5,
					id:"five",
					orphan:true,
					droppable:false,
					endpoint:["Dot", { radius:3 }]
			});
			j.addToGroup("five", [c5_1, c5_2]);
			j.draggable(c5_2);

			j.draggable(c6_1);
			j.addGroup({
					el:container6,
					id:"six",
					proxied:false,
					endpoint:["Dot", { radius:3 }]
			});
			j.addToGroup("six", [c6_1, c6_2]);
			j.draggable(c6_2);

			j.draggable(c7_1);
			j.addGroup({
					el:container7,
					id:"seven",
					ghost:true,
					endpoint:["Dot", { radius:3 }]
			});
			j.addToGroup("seven", [c7_1, c7_2]);
			j.draggable(c7_2);

    	// the independent element that demonstrates the fact that it can be dropped onto a group
    	j.draggable("standalone");

			//... and connect others afterwards.
			j.connect({source:c3_1,target:c3_2});
			j.connect({source:c4_1,target:c4_2});
			j.connect({source:c5_1,target:c5_2});
			j.connect({source:c5_1,target:c3_2});
			j.connect({source:c5_1,target:container5, anchors:["Center", "Continuous"]});
			j.connect({source:c5_2,target:c6_1});
			j.connect({source:c6_2,target:c7_1});

			// delete group button
			j.on(canvas, "click", ".del", function() {
					var g = this.parentNode.getAttribute("group");
					j.removeGroup(g, this.getAttribute("delete-all") != null);
			});

			// collapse/expand group button
			j.on(canvas, "click", ".node-collapse", function() {
					var g = this.parentNode.getAttribute("group"), collapsed = j.hasClass(this.parentNode, "collapsed");

					j[collapsed ? "removeClass" : "addClass"](this.parentNode, "collapsed");
					j[collapsed ? "expandGroup" : "collapseGroup"](g);
			});

    	jsPlumb.fire("jsPlumbDemoLoaded", j);
		});           
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w {
    position:absolute;
    width:30px;
    height:30px;
    border:1px solid black;
    font-size:12px;
    border-radius:3px;
    text-align:center;
    background-color:WhiteSmoke;
    opacity:0.7;
    z-index:10;
    color:black;
    cursor:move;
}

.w:hover {
    background-color:#629f8d;
}

.group-container {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 12px;
    background-color: WhiteSmoke;
    font-size: 12px;
    cursor:move;
}

.group-container ul {
    margin-left:25px;
    padding: 0;
}

.group-container ul li {
    list-style-type:circle;
    margin-bottom: 7px;
}

.large {
    width:600px;
    height:600px;
}

.group-container.collapsed {
    height:40px;
}

.title {
    background-color:#ABC1BB;
    padding-right:16px;
    font-size:13px;
		height:30px;
		padding-left: 10px;
		padding-top: 3px;
}

#container1 { left:20px;top:50px; }
#container2 { left:250px;top:50px; }
#container3 { left:480px;top:50px; }
#container4 { left:710px;top:50px; }
#container5 { left:600px;top:340px; }
#container6 { left:370px;top:340px; }
#container7 { left:140px;top:340px; }

.del, .node-collapse {
    position:absolute;
    top:5px;
    right:5px;
    background-color:white;
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
    right:29px;
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

.jtk-connector path {
    stroke-width:1;
}

.jtk-group-collapsed .w, .jtk-group-collapsed ul, .jtk-group-collapsed .container, .jtk-group-collapsed .name {
    display:none;
}

.jtk-drag-hover {
    outline:4px solid cornflowerblue;
}

.katavorio-ghost-proxy {
    outline:2px solid red;
}

.events {
    position:absolute;
    right:0;
    top:0;
    border-left:4px solid #58775d;
    bottom:0;
    width:156px;
    font-size: 11px;
    padding-left:11px;
    background-color: white;
}

#events {
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #58775d;
    bottom: 0;
    width: 256px;
    font-size: 11px;
    padding-left: 11px;
    background-color: white;
}

.events h3 {
    font-size: 20px;
    margin-top: 10px;
}

</style>
