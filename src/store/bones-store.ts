import { s3 } from '@/api/S3Service.ts';
import { create } from 'zustand';

export const S3_URL = 'https://s3.eu-central-1.amazonaws.com/';
export const ALBUM_BUCKET_NAME = 'dataspan.frontend-home-assignment';
export const ALBUM_MAIN_FOLDER = 'bone-fracture-detection';

interface Label {
	className: string;
	coords: number[];
}

interface DataItem {
	key: string;
	label: string;
	lowResPath: string;
	highResPath: string;
	labels: Label[];
}

interface BonesState {
	data: {
		test: DataItem[];
		train: DataItem[];
		valid: DataItem[];
	};
	tab: string;
	setTab: (tab: string) => void;
	fetchListObjectsByPath: (path: 'test' | 'train' | 'valid') => void;
}

const fetchListObjectsByPath = async (path: string) => {
	const data = (
		await s3
			.listObjects({
				Prefix: `${ALBUM_MAIN_FOLDER}/${path}/thumbnails`,
				MaxKeys: 200,
			})
			.promise()
	).Contents;

	return await Promise.all(
		// @ts-ignore
		data.map(async ({ Key }) => {
			const lowResPath = S3_URL + ALBUM_BUCKET_NAME + '/' + Key;
			const highResPath = lowResPath.replace('thumbnails', 'images');
			const label = Key?.split('/').pop() || '';

			const file = await (
				await fetch(
					lowResPath.replace('thumbnails', 'labels').replace('.jpg', '.txt')
				)
			).text();

			const rows = file.split('\n').reduce<Label[]>((acc, curr) => {
				const splitRow = curr.split(' ');
				if (splitRow.length > 1) {
					acc.push({
						className: splitRow[0],
						coords: splitRow.splice(1).map(Number),
					});
				}
				return acc;
			}, []);

			return {
				key: Key,
				label: label || '',
				lowResPath,
				highResPath,
				labels: rows,
			};
		})
	);
};

export const useBonesStore = create<BonesState>((set) => ({
	data: {
		test: [],
		train: [],
		valid: [],
	},
	tab: '',
	setTab: (tab: string) => set({ tab }),

	fetchListObjectsByPath: async (path: 'test' | 'train' | 'valid') => {
		const dataWithLabels = await fetchListObjectsByPath(path);
		set((state) => ({
			data: {
				...state.data,
				[path]: dataWithLabels,
			},
		}));
	},
}));
