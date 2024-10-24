import { Trash } from '@/assets/svg/trash.tsx';
import { RangeInput } from '@/components/ui/range-input.tsx';
import { TagButton } from '@/components/ui/tag-button.tsx';
import { BODY_PART_COLOR_MAP, BODY_PART_CLASS_NAMES } from '@/lib/constants.ts';
import { capitalizeFirstLetter } from '@/lib/utils.ts';
import { useFiltersStore } from '@/store/filter-store.ts';

export const Sidebar = () => {
	const {
		range,
		filters,
		clearFilters,
		removeFilter,
		addFilter,
		setRange,
		setFilters,
	} = useFiltersStore();

	return (
		<div className={'rounded-[10px] border border-[#d1d1d6] px-6 py-5'}>
			<img src="/assets/images/logo.png" alt="logo" className={'mb-[42px]'} />
			<div className={'mb-6'}>
				<p>Classes filter</p>
				<div className={'mb-3 mt-[16px] flex items-center gap-[16px]'}>
					<button
						className={
							'pointer border-none bg-none text-[12px] text-[#3d9be9] disabled:cursor-default disabled:text-[#d1d1d6]'
						}
						onClick={() =>
							setFilters(BODY_PART_CLASS_NAMES as unknown as string[])
						}
						disabled={filters.length === BODY_PART_CLASS_NAMES.length}
					>
						Select all
					</button>
					<button
						className={
							'pointer border-none bg-none text-[12px] text-[#3d9be9] disabled:cursor-default disabled:text-[#d1d1d6]'
						}
						onClick={() => setFilters([])}
						disabled={!filters.length}
					>
						Deselect all
					</button>
				</div>
				<div className={'mb-3 mt-[16px] flex flex-wrap items-center gap-[16px]'}>
					{BODY_PART_CLASS_NAMES.map((classname) => {
						const isActive = filters.includes(classname);

						return (
							<TagButton
								key={classname}
								text={capitalizeFirstLetter(classname)}
								onClick={
									!isActive
										? () => addFilter(classname)
										: () => removeFilter(classname)
								}
								color={
									BODY_PART_COLOR_MAP[
										classname as keyof typeof BODY_PART_COLOR_MAP
									]
								}
								selected={isActive}
							/>
						);
					})}
				</div>
			</div>
			<div className={'mb-6'}>
				<p>Polygon range</p>
				<div className={'mt-3'}>
					<RangeInput
						step={1}
						min={0}
						max={4}
						values={range}
						setValues={setRange}
					/>
				</div>
			</div>
			<div className={'flex items-center justify-between'}>
				<button
					className={
						'pointer flex items-center gap-1.5 border-none bg-none text-[12px]'
					}
					onClick={clearFilters}
				>
					<Trash />
					Clear Filters
				</button>
				<button
					className={
						'pointer border-none bg-none text-[12px] font-normal text-black/50'
					}
				>
					Need help?
				</button>
			</div>
		</div>
	);
};
