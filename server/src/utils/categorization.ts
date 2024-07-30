const categories = {
	'Groceries': ['supermarket', 'grocery', 'food', 'market'],
	'Utilities': ['electric', 'water', 'gas', 'internet', 'phone'],
	'Transportation': ['uber', 'lyft', 'taxi', 'bus', 'train', 'fuel', 'parking'],
	'Entertainment': ['movie', 'theatre', 'concert', 'game'],
	'Dining Out': ['restaurant', 'cafe', 'bar', 'pub'],
	'Shopping': ['mall', 'store', 'shop', 'amazon'],
	'Healthcare': ['doctor', 'hospital', 'pharmacy', 'medicine'],
	'Education': ['school', 'university', 'course', 'book'],
	'Travel': ['hotel', 'flight', 'airbnb', 'vacation'],
	'Housing': ['rent', 'mortgage', 'insurance'],
};

export const categorizeExpense = (description: string): string => {
	const lowerDescription = description.toLowerCase();
	for (const [category, keywords] of Object.entries(categories)) {
		if (keywords.some(keyword => lowerDescription.includes(keyword))) {
			return category;
		}
	}
	return 'Other';
};
