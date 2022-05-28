import {PATH} from '@/stores/Url'
window.addEventListener("popstate", event => {
    PATH.popStateChange(event.state === null || event.state < PATH.state);
});