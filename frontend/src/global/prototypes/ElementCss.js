export default function () {
    const target = this;
    const style = getComputedStyle(this);
    const styleProxy = {
        get: (object, property) => {
            return (value) => {
                if (value) {
                    object[property] = value;
                    return new Proxy(object, styleProxy);
                }
                return object[property] ? object[property] : style[property];
            }
        }
    }
    return new Proxy(target.style, styleProxy);
}