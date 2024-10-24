export const BODY_PART_CLASS_NAMES = [
	'elbow positive',
	'fingers positive',
	'forearm fracture',
	'humerus fracture',
	'humerus',
	'shoulder fracture',
	'wrist positive',
] as const;

export const BODY_PART_COLOR_MAP = {
	'elbow positive': '#3D9BE9',
	'fingers positive': '#BADA55',
	'forearm fracture': '#FFD75C',
	'humerus fracture': '#F25858',
	humerus: '#2CE1CB',
	'shoulder fracture': '#FDB03E',
	'wrist positive': '#D783FF',
} as const;
