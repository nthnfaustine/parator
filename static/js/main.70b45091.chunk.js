(this.webpackJsonpparator=this.webpackJsonpparator||[]).push([[0],{257:function(t,e,n){},259:function(t,e,n){},261:function(t,e,n){},266:function(t,e){},267:function(t,e){},275:function(t,e){},278:function(t,e){},279:function(t,e){},281:function(t,e,n){"use strict";n.r(e);var a=n(76),r=n.n(a),s=n(232),u=n.n(s),i=(n(257),n(4)),o=n.n(i),c=n(11),p=n(5),h=n(10),l=n(14),f=n(15),d=(n(259),n(38)),j=function(){return Object(d.jsx)("nav",{style:{display:"flex",justifyContent:"flex-end"},children:Object(d.jsx)("p",{className:"f3 link dim black underline pa3 pointer white"})})},m=(n(261),function(t){var e=t.onInputChange,n=t.onButtonSubmit,a=t.onInputChange2;return Object(d.jsxs)("div",{className:"ma4 mt0",children:[Object(d.jsx)("p",{className:"f3 white",children:"Masukan sampiran pantun dan tekan Generate untuk membuat pantun"}),Object(d.jsx)("div",{className:"center",children:Object(d.jsxs)("div",{className:"form center pa4 br3 shadow-5",children:[Object(d.jsx)("input",{className:"f4 pa2 w-70 center",onChange:e}),Object(d.jsx)("input",{className:"f4 pa2 w-70 center",onChange:a}),Object(d.jsx)("button",{className:"w-30 grow f4 link ph3 pv2 dib white bg-light-purple",onClick:n,children:"Generate"})]})})]})}),v=function(){return Object(d.jsx)("div",{className:"ma4 mt0",children:Object(d.jsx)("div",{className:"white f3",children:"Pantun Generator"})})},b=function(t){var e=t.sampiran1,n=t.sampiran2,a=t.output1,r=t.output2;return Object(d.jsxs)("div",{className:"ma4 mt0 shadow-5 pa4 br3",children:[Object(d.jsx)("p",{className:"white",children:e}),Object(d.jsx)("p",{className:"white",children:n}),Object(d.jsx)("p",{className:"white",children:a}),Object(d.jsx)("p",{className:"white",children:r})]})},x=n(101),O=function(t){Object(l.a)(n,t);var e=Object(f.a)(n);function n(){var t;return Object(p.a)(this,n),(t=e.call(this)).onInputChange=function(e){var n=e.target.value,a=n.split(" ");t.setState({input1:n}),t.setState({output1:a[a.length-1]})},t.onInputChange2=function(e){var n=e.target.value,a=n.split(" ");t.setState({input2:n}),t.setState({output2:a[a.length-1]})},t.onButtonSubmit=function(){var e,n=t.state.input1.split(" "),a=t.state.input2.split(" "),r=n[n.length-1].toLowerCase(),s=a[a.length-1].toLowerCase(),u=r.split(""),i=s.split(""),p=[],h=[];for(e=0;e<u.length;e++)p.push(t.state.wordDic[u[e]]);for(e=0;e<120-u.length;e++)p.unshift(0);for(e=0;e<i.length;e++)h.push(t.state.wordDic[i[e]]);for(e=0;e<120-i.length;e++)h.unshift(0);var l=x.b(p).expandDims(0),f=x.b(h).expandDims(0);(function(){var n=Object(c.a)(o.a.mark((function n(a){var r,s,u,i,c,p,h,d,j;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.predictAkhiran(l);case 2:return n.next=4,t.predictAkhiranOther(f);case 4:return n.next=6,new Promise((function(t){return setTimeout(t,400)}));case 6:for(c in r=t.state.kamos.akhiran,s=t.state.kamos.kata,u=[],i=[],r)r[c]==t.state.akhiran1&&u.push(c),r[c]==t.state.akhiran2&&i.push(c);return p=u[Math.floor(Math.random()*u.length)],h=i[Math.floor(Math.random()*i.length)],d=s[p],j=s[h],t.setState({output1:d}),t.setState({reverseOutput1:d}),t.setState({output2:j}),t.setState({reverseOutput2:j}),n.next=21,new Promise((function(t){return setTimeout(t,400)}));case 21:e=0;case 22:if(!(e<3)){n.next=32;break}return n.next=25,t.generatePantun(t.state.output1);case 25:return n.next=27,t.generatePantunOther(t.state.output2);case 27:return n.next=29,new Promise((function(t){return setTimeout(t,400)}));case 29:e++,n.next=22;break;case 32:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}})()()},t.state={input1:"",input2:"",wordDic:[],wordDicLabel:[],pantunDic:[],akhiran1:"",output1:"",reverseOutput1:"",akhiran2:"",output2:"",reverseOutput2:"",kamos:{}},t}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var t=this;fetch("./word_dict.json",{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(e){return t.setState({wordDic:e})})),fetch("./word_dict_label.json",{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(e){return t.setState({wordDicLabel:e})})),fetch("./generator_dict.json",{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(e){return t.setState({pantunDic:e})})),fetch("./test.json",{headers:{"Content-Type":"application/json",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(e){return t.setState({kamos:e})}))}},{key:"generatePantun",value:function(){var t=Object(c.a)(o.a.mark((function t(e){var n,a,r=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("cooking pantun"),t.next=3,x.a("./pantunModel/model.json");case 3:return n=t.sent,t.next=6,this.preprocessPantunInput(e);case 6:a=t.sent,n.predict(a).data().then((function(t){var e=Math.max.apply(Math,t),n=t.indexOf(e),a=r.swap(r.state.pantunDic),s=r.state.output1+" "+a[n],u=a[n]+" "+r.state.reverseOutput1;r.setState({output1:s}),r.setState({reverseOutput1:u}),console.log(s)}));case 9:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"generatePantunOther",value:function(){var t=Object(c.a)(o.a.mark((function t(e){var n,a,r=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("cooking pantun"),t.next=3,x.a("./pantunModel/model.json");case 3:return n=t.sent,t.next=6,this.preprocessPantunInput(e);case 6:a=t.sent,n.predict(a).data().then((function(t){var e=Math.max.apply(Math,t),n=t.indexOf(e),a=r.swap(r.state.pantunDic),s=r.state.output2+" "+a[n],u=a[n]+" "+r.state.reverseOutput2;r.setState({output2:s}),r.setState({reverseOutput2:u}),console.log(s)}));case 9:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"predictAkhiran",value:function(){var t=Object(c.a)(o.a.mark((function t(e){var n,a=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("detecting akhiran..."),t.next=3,x.a("./rhymeModel/model.json");case 3:n=t.sent,n.predict(e).data().then((function(t){var e=Math.max.apply(Math,t),n=t.indexOf(e),r=a.swap(a.state.wordDicLabel);a.setState({akhiran1:r[n]})}));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"predictAkhiranOther",value:function(){var t=Object(c.a)(o.a.mark((function t(e){var n,a=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("detecting akhiran..."),t.next=3,x.a("./rhymeModel/model.json");case 3:n=t.sent,n.predict(e).data().then((function(t){var e=Math.max.apply(Math,t),n=t.indexOf(e),r=a.swap(a.state.wordDicLabel);a.setState({akhiran2:r[n]})}));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"preprocessPantunInput",value:function(t){var e,n=t.toLowerCase().split(" "),a=[];for(e=0;e<n.length;e++){var r=0;n[e]in this.state.pantunDic&&(r=this.state.pantunDic[n[e]]),a.push(r)}for(e=0;e<7-n.length;e++)a.unshift(0);return x.b(a).expandDims(0)}},{key:"swap",value:function(t){var e={};for(var n in t)e[t[n]]=n;return e}},{key:"render",value:function(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(j,{}),Object(d.jsx)(v,{}),Object(d.jsx)(m,{onInputChange:this.onInputChange,onButtonSubmit:this.onButtonSubmit,onInputChange2:this.onInputChange2}),Object(d.jsx)(b,{sampiran1:this.state.input1,sampiran2:this.state.input2,output1:this.state.reverseOutput1,output2:this.state.reverseOutput2})]})}}]),n}(a.Component),g=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,282)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,s=e.getLCP,u=e.getTTFB;n(t),a(t),r(t),s(t),u(t)}))};n(280);u.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(O,{})}),document.getElementById("root")),g()}},[[281,1,2]]]);
//# sourceMappingURL=main.70b45091.chunk.js.map