export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2, 0);
}

export default formatCurrency;