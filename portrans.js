﻿
window.addEventListener('load',function(){
    console.log('load');
    var scripts = document.getElementsByTagName('script');
    for (i = 0; i < scripts.length; i++){
        var index=scripts[i].src.indexOf('portrans.js?url=');
        if(index>0){
            window.addEventListener('message', function (rs) {
                window.history.replaceState({}, "", rs.data.portrans);  
            });
            var host=scripts[i].src.substr(index+16);
            document.getElementsByTagName('iframe')[0].src = host + window.location.pathname + window.location.search;
            return;
        }
    }
    console.log('not found url');
    class Dep {                  // 订阅池
        constructor(name) {
            this.id = new Date() //这里简单的运用时间戳做订阅池的ID
            this.subs = []       //该事件下被订阅对象的集合
        }
        defined() {              // 添加订阅者
            Dep.watch.add(this);
        }
        notify() {              //通知订阅者有变化
            this.subs.forEach((e, i) => {
                if (typeof e.update === 'function') {
                    try {
                        e.update.apply(e)  //触发订阅者更新函数
                    } catch (err) {
                        console.warr(err)
                    }
                }
            })
        }
    }
    Dep.watch = null;
    class Watch {
        constructor(name, fn) {
            this.name = name;       //订阅消息的名称
            this.id = new Date();   //这里简单的运用时间戳做订阅者的ID
            this.callBack = fn;     //订阅消息发送改变时->订阅者执行的回调函数
        }
        add(dep) {                  //将订阅者放入dep订阅池
            dep.subs.push(this);
        }
        update() {                  //将订阅者更新方法
            var cb = this.callBack; //赋值为了不改变函数内调用的this
            cb(this.name);
        }
    }
    var addHistoryMethod = (function () {
        var historyDep = new Dep();
        return function (name) {
            if (name === 'historychange') {
                return function (name, fn) {
                    var event = new Watch(name, fn)
                    Dep.watch = event;
                    historyDep.defined();
                    Dep.watch = null;       //置空供下一个订阅者使用
                }
            } else if (name === 'pushState' || name === 'replaceState') {
                var method = history[name];
                return function () {
                    method.apply(history, arguments);
                    historyDep.notify();
                }
            }
        }
    }())
    window.addHistoryListener = addHistoryMethod('historychange');
    history.pushState = addHistoryMethod('pushState');
    history.replaceState = addHistoryMethod('replaceState');
    window.addHistoryListener('history', function () {
        const url = window.location.pathname + window.location.search;
        window.parent.postMessage({'portrans':url}, '\*');
    });
    console.log('postmessage');
    const url = window.location.pathname + window.location.search;
    window.parent.postMessage({'portrans':url}, '\*');

});