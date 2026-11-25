import type { BlogLang } from '../../../lib/blog';

export const plotOptions = {
	axis: { min: -75, max: 50, step: 25 },
	unit: '%',
	signed: true,
	precision: 2,
};

export function providerRows(lang: BlogLang) {
	const input = lang === 'ko' ? '총 입력 토큰' : 'Total input tokens';
	const cost = lang === 'ko' ? '추정 비용' : 'Estimated cost';
	return [
		{ group: 'OpenAI', label: input, value: 37.32, low: 30.48, high: 43.61 },
		{ group: 'OpenAI', label: cost, value: -19.83, low: -23.08, high: -16.81, marker: 'diamond' as const },
		{ group: 'Anthropic', label: input, value: 6.00, low: 1.59, high: 10.21 },
		{ group: 'Anthropic', label: cost, value: -48.23, low: -49.80, high: -46.76, marker: 'diamond' as const },
	];
}

export function budgetRows(lang: BlogLang) {
	const group = lang === 'ko' ? '두 방식에 적용한 문서 예산' : 'Document budget for both setups';
	const marker = 'diamond' as const;
	return [
		{ group, marker, label: '2.5%', value: 17.82, low: 4.26, high: 29.21 },
		{ group, marker, label: '5%', value: -29.59, low: -40.33, high: -20.03 },
		{ group, marker, label: '10%', value: -57.38, low: -65.58, high: -49.22 },
	];
}
