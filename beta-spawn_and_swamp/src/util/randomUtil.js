

/**
 * 生成一个随机数
 * @param min
 * @param max
 * @returns {number}
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min); // 将最小值向上取整
    max = Math.floor(max); // 将最大值向下取整
    return Math.floor(Math.random() * (max - min + 1)) + min;
}