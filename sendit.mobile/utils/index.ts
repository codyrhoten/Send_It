export * from './address';

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}