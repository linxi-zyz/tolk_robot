function $(Selector){
    return document.querySelector(Selector)
}
function $$(Selector){
    return document.querySelectorAll(Selector)
}
function $$$(tagName){
    return document.createElement(tagName);
}