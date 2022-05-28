import {reactive} from 'vue'

export const PATH = reactive({
    url: window.location.pathname,
    params: window.location.search,
    state: history.state,
    param(param) {
        let params = new URLSearchParams(this.params);
        return params.get(param);
    },
    setUrlParam(param, value) {
        let params = new URLSearchParams(this.params);
        params.set(param, value);
        this.changeUrl(this.url+"?"+params.toString());
    },    
    removeParam(param) {
        let params = new URLSearchParams(window.location.search);
        params.delete(param);
        params = params.toString();
        if (params.length) {
            this.changeUrl(this.url+"?"+params.toString());
        } else {
            this.changeUrl(this.url);
        }
    },
    key(level) {
        let levels = this.url.split("/").slice(1);
        let res = levels.slice(0, level).join("/");
        return res;
    },
    changeUrl(url = "/") {
        if (url === null) return;
        if (url[0] != "/") url = "/"+url;
        if (this.state === null) this.state = 0;
        history.pushState(this.state++, null, url);
        this.url = window.location.pathname;
        this.params = window.location.search;
    },
    popStateChange(back) {
        var url = window.location.pathname+window.location.search;
        if (url.length < 1) url = "/";
        if (url[0] != "/") url.unshift("/");
        if (this.state === null) this.state = 0;
        else {
            if (back) this.state--;
            else this.state++;
        }
        history.replaceState(this.state, null, url);
        this.url = window.location.pathname;
        this.params = window.location.search;
    },
    isCurrentPage(page) {
        if (page === null) return false;
        return this.url.toLowerCase() === page.toLowerCase();
    },
    pageContains(page) {
        if (page === null) return false;
        let str = window.location.pathname.slice(0, page.length);
        return str.toLowerCase() === page.toLowerCase();
    }
});