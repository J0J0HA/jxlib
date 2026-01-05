export let allButtons = $state({ disabled: false });

export async function heavy<T>(promise: Promise<T>): Promise<T> {
    allButtons.disabled = true;
    return await promise.then((res) => {
        allButtons.disabled = false;
        return res;
    }).catch((err) => {
        allButtons.disabled = false;
        throw err;
    });
}

export function heavyWrap<T>(func: (e: MouseEvent) => Promise<T>): (e: MouseEvent) => Promise<T> {
    return (e) => {
        return heavy(func(e));
    };
}