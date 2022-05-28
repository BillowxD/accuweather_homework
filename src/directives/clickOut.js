export default {
    mounted: function (el, binding, vnode) {
        el.clickOut = function(e) {
            if (el.contains(e.target) || el === e.target) return;
            binding.instance.$emit('clickOut');
        };
        window.addEventListener("click", el.clickOut);
    },
    unmounted: function(el, binding, vnode) {
        window.removeEventListener("click", el.clickOut);
    }
}