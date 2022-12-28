export const nettleie = (usage: Number) => {
    if (usage < 2) {
        return 125;
    }
    if (usage < 5) {
        return 206;
    }
    if (usage < 10) {
        return 350;
    }
    if (usage < 15) {
        return 494;
    }
    if (usage < 20) {
        return 638;
    }
    if (usage < 25) {
        return 781;
    }
}