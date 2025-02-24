class Query {
	limit(limit: string): number {
		return !isNaN(Number(limit)) &&
			Number(limit) < 100 &&
			Number(limit) > 0
			? Number(limit)
			: 100;
	}

	offset(offset: string): number {
		return !isNaN(Number(offset)) ? Number(offset) : 0;
	}
}

export default new Query();
