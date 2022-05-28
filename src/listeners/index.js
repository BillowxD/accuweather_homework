function requireAll(r) {
    r.keys().forEach(r);
}
export default requireAll(require.context('./', true, /\.js$/));