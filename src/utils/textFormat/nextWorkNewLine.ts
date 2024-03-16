
type TupleStringTwo = [first: string, next: string];

export const nextWordNewLine = (text: string): TupleStringTwo => {
    const reg = /^(\S+)\s/;
    const textArr = text.split(reg).filter(text => text.length > 0) as TupleStringTwo;

    return textArr;
}