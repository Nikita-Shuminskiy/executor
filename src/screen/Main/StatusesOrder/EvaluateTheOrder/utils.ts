export const getArrayPriceOrder = (priceDataPayload) => {
	return Object.entries(priceDataPayload).map(([key, value]) => {
		if (!value) return
		return { [key]: String(value) }
	})
}
