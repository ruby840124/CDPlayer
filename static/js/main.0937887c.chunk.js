(this.webpackJsonpmp3_player=this.webpackJsonpmp3_player||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/music.cc723b56.mp3"},function(e,t,a){e.exports=a(19)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/play.c363353e.svg"},function(e,t,a){e.exports=a.p+"static/media/stop.a54fda48.svg"},function(e,t,a){e.exports=a.p+"static/media/player.35d7ffce.svg"},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(6),o=a.n(l),i=(a(13),a(1)),s=a(2),r=a(4),m=a(3),u=a(7),d=a.n(u),p=(a(14),a(15),a(16),{playState:!1,audio:null}),v=function(e){Object(r.a)(n,e);var t=Object(m.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).addAudio=function(){var e=a.props.mp3,t=document.createElement("audio");t.src=e,a.setState({audio:t})},a.play=function(){var e=a.state,t=e.playState,n=e.audio;t?(n.pause(),a.setState({playState:!1})):(n.play(),a.setState({playState:!0}))},a.state=p,a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.addAudio()}},{key:"componentWillUnmount",value:function(){this.state.audio.pause()}},{key:"render",value:function(){var e=this.state.playState,t=this.props,n=t.musicName,l=t.author;return c.a.createElement("div",{className:"main"},c.a.createElement("div",{className:"player"},c.a.createElement("div",{className:"playerTopBlock"},c.a.createElement("div",{className:"CD",style:{animationPlayState:e?"running":"paused"}},c.a.createElement("div",{className:"CDCenter"})),c.a.createElement("div",{className:"buttons"},c.a.createElement("div",null,c.a.createElement("div",{className:"nextButton"}),c.a.createElement("div",{className:"lastButton"})),c.a.createElement("div",{className:"cycleButton"}))),c.a.createElement("div",{className:"playerBottomBlock"},c.a.createElement("div",null,c.a.createElement("div",{className:"adjustBlock"},c.a.createElement("div",{className:"musicInfo"},c.a.createElement("div",{style:{fontSize:"24px",fontWeight:"bold"}},n),c.a.createElement("div",null,l)),c.a.createElement("div",{className:"playerComponent",style:{backgroundImage:"url("+a(17)+")"}}),c.a.createElement("div",null,"456")),c.a.createElement("div",{className:"adjustBar"},"123")))))}}]),n}(c.a.Component),f=(a(18),{clockState:!0}),y=function(e){Object(r.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state=f,n}return Object(s.a)(a,[{key:"render",value:function(){return c.a.createElement("div",{className:"App"},c.a.createElement(v,{mp3:d.a,musicName:"Summertime",author:"\u5468\u6770\u502b"}))}}]),a}(c.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.0937887c.chunk.js.map