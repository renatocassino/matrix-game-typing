import{s as S,n as f,f as x}from"../chunks/scheduler.14a511a7.js";import{S as y,i as j,g as _,m as d,s as q,h as g,j as h,n as v,f as u,c as C,a as m,y as $,o as E}from"../chunks/index.958303d5.js";import{d as H}from"../chunks/singletons.209caecb.js";const P=()=>{const s=H;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},k={subscribe(s){return P().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",o,n,i,c=((b=s[0].error)==null?void 0:b.message)+"",l;return{c(){t=_("h1"),o=d(r),n=q(),i=_("p"),l=d(c)},l(e){t=g(e,"H1",{});var a=h(t);o=v(a,r),a.forEach(u),n=C(e),i=g(e,"P",{});var p=h(i);l=v(p,c),p.forEach(u)},m(e,a){m(e,t,a),$(t,o),m(e,n,a),m(e,i,a),$(i,l)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&E(o,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&E(l,c)},i:f,o:f,d(e){e&&(u(t),u(n),u(i))}}}function z(s,t,r){let o;return x(s,k,n=>r(0,o=n)),[o]}let F=class extends y{constructor(t){super(),j(this,t,z,w,S,{})}};export{F as component};
