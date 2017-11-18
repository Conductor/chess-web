export const separatorOfArray: (array: string[], chunksize?: number) => string[][] = (array, size = 8) => {
    return [].concat.apply([],
        array.map(function(elem: string, i: number): string[][] {
            return i % size ? [] : [array.slice(i, i + size)];
        })
    );
};
