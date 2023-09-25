export default function interpretSpread(spread: number, opponent?: string) {
    if (spread < 0) {
        return (
            `to win by ${Math.abs(spread)} or more` +
            (opponent ? ` over the ${opponent}` : ``)
        );
    } else if (spread > 0) {
        return (
            `to win or lose by ${spread} or less` +
            (opponent ? ` against the ${opponent}` : ``)
        );
    } else {
        return `to tie` + (opponent ? ` the ${opponent}` : ``);
    }
}
