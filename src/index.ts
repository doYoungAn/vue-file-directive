import { DirectiveOptions } from 'vue';

interface CustomFile {
    file: File
}

export interface FileChangeEvent extends CustomEvent {
    detail: CustomFile;
}

const Directive: DirectiveOptions = {
    bind: function(el, binding, vnode, oldVnode) {
        const inputEl: HTMLInputElement = document.createElement('input');
        inputEl.type = 'file';
        inputEl.style.display = 'none';
        el.appendChild(inputEl);
        const handlerInput = (event: any) => {
            const eventName: string = 'file-change';
            const eventData: CustomFile = { file: event.target.files[0] };
            vnode.elm!.dispatchEvent(new CustomEvent(eventName, {detail: eventData}));
        };
        inputEl.addEventListener('change', handlerInput, false);
        const handlerEl = () => {
            inputEl.click();
        };
        el.style.cursor = 'pointer';
        el.addEventListener('click', handlerEl, false);
        (el as any).$destroy = () => {
            inputEl.removeEventListener('change', handlerInput);
            el.removeEventListener('click', handlerEl);
        }
    },
    inserted: function(el, binding, vnode, oldVnode) {},
    update: function(el, binding, vnode, oldVnode) {},
    componentUpdated: function(el, binding, vnode, oldVnode) {},
    unbind: function(el, binding, vnode, oldVnode) {
        (el as any).$destroy();
    }
}

export default Directive;