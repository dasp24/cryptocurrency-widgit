export async function bitcoin() {
    const response = await fetch('http://coincap.io/page/BTC');
    return response.json();
}

export async function ethereum() {
    const response = await fetch('http://coincap.io/page/ETH');
    return response.json();
}

export async function litecoin() {
    const response = await fetch('http://coincap.io/page/LTC');
    return response.json();
}

export async function ripple() {
    const response = await fetch('http://coincap.io/page/XRP');
    return response.json();
}

export async function exchange() {
    const response = await fetch('http://api.fixer.io/latest?symbols=USD&base=GBP');
    return response.json();
}