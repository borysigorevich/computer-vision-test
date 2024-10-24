import { BoneVisualizationCard } from '@/components/bone-visualization-card.tsx';
import { Pagination } from '@/components/ui/pagination.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { BODY_PART_CLASS_NAMES } from '@/lib/constants.ts';
import { useBonesStore } from '@/store/bones-store.ts';
import { useFiltersStore } from '@/store/filter-store.ts';
import React, { useEffect, useMemo, useState } from 'react';

interface Label {
	className: string;
	coords: number[];
}

interface BoneDataItem {
	lowResPath: string;
	highResPath: string;
	label: string;
	labels: Label[];
}

const BONE_GROUP_TABS = [
	{ label: 'All groups', value: '' },
	{ label: 'Train', value: 'train' },
	{ label: 'Valid', value: 'valid' },
	{ label: 'Test', value: 'test' },
];

const IMAGES_PER_PAGE = 36;

export const BoneGallery: React.FC = () => {
	const { tab, setTab, data } = useBonesStore();
	const { filters, range } = useFiltersStore();
	const [page, setPage] = useState(0);

	const filteredItems = useMemo(() => {
		const combinedData: BoneDataItem[] = tab
			? data[tab as keyof typeof data]
			: [...data.train, ...data.valid, ...data.test];

		return combinedData.filter((item: BoneDataItem) => {
			const matchesFilters = filters.length
				? item.labels.some(({ className }) =>
						filters.includes(BODY_PART_CLASS_NAMES[+className])
					)
				: true;

			const matchesRange =
				item.labels.length >= range[0] && item.labels.length <= range[1];

			return matchesFilters && matchesRange;
		});
	}, [tab, filters, range, data]);

	const paginatedItems = useMemo(
		() =>
			filteredItems
				.slice(
					(page + 1) * IMAGES_PER_PAGE - IMAGES_PER_PAGE,
					(page + 1) * IMAGES_PER_PAGE
				)
				.sort(),
		[page, filteredItems]
	);

	useEffect(() => {
		setPage(0);
	}, [tab, filters, range]);

	const ImagePanel: React.FC = () => (
		<div className="flex h-full flex-col items-center justify-between gap-[38px]">
			<div className="grid max-w-full grid-cols-9 gap-3 overflow-hidden">
				{paginatedItems.map(({ lowResPath, highResPath, label, labels }) => (
					<BoneVisualizationCard
						key={lowResPath}
						lowResImage={lowResPath}
						highResImage={highResPath}
						title={label}
						details={labels}
					/>
				))}
			</div>
			<Pagination
				pageCount={Math.ceil(filteredItems.length / IMAGES_PER_PAGE)}
				onPageChange={({ selected }) => setPage(selected)}
				forcePage={page}
				pageRangeDisplayed={3}
				marginPagesDisplayed={3}
			/>
		</div>
	);

	return (
		<div className="flex flex-col py-[18px]">
			<div className="mb-[26px] flex items-center justify-between">
				<p className="text-[32px]">Bone Fracture Detection</p>
				<div className="text-[18px] font-normal">
					<strong className="font-semibold">{paginatedItems.length}</strong> of{' '}
					<strong className="font-semibold">{filteredItems.length}</strong>{' '}
					images
				</div>
			</div>
			<Tabs onValueChange={setTab} defaultValue="">
				<div className="w-full border-b border-[#d1d1d6]">
					<TabsList className="-mb-px h-full p-0">
						{BONE_GROUP_TABS.map(({ label, value }) => (
							<TabsTrigger key={value} value={value}>
								{label}
							</TabsTrigger>
						))}
					</TabsList>
				</div>
				<TabsContent value={tab}>
					<ImagePanel />
				</TabsContent>
			</Tabs>
		</div>
	);
};
