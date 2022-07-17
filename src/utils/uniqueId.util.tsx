export const uid = (id: string) => {
    const val1 = Date.now().toString(36);

    const val2 = Math.random().toString(36).substring(2);

    return id + val1 + val2;
};
