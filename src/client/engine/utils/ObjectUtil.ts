
export const ObjectUtil = {

    observe:observe
};

export function observe(o, fn) {

    function buildProxy(prefix, o) {

        return new Proxy(o, {

            set(target: any, p: string, value: any, receiver: any):boolean {

                // same as before, but add prefix
                let oldValue:any = target[p];

                target[p] = value;

                fn.call(target, prefix + p, value, oldValue);

                return true;
            },

            get(target: any, p: string, receiver: any) {

                // return a new proxy if possible, add to prefix
                let out = target[p];

                if (out instanceof Object && !(out instanceof Array)) {

                    return buildProxy(prefix + p + ".", out);
                }

                return out;  // primitive, ignore
            },
        });
    }

    return buildProxy("", o);
}
