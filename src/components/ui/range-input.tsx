import { cn } from '@/lib/utils.ts';
import { Range } from 'react-range';

type RangeInputProps = {
	step: number;
	min: number;
	max: number;
	values: [number, number];
	setValues: (values: [number, number]) => void;
};

export const RangeInput = ({ step, min, max, values, setValues }: RangeInputProps) => {
	return (
		<div>
			<div
				className={
					'mb-3 flex items-center justify-between text-[12px] font-normal'
				}
			>
				<p>
					min <strong className={'font-semibold'}>{min}</strong>
				</p>
				<p>
					max <strong className={'font-semibold'}>{max}</strong>
				</p>
			</div>
			<Range
				values={values}
				step={step}
				min={min}
				max={max}
				onChange={(values) => {
					setValues(values as [number, number]);
				}}
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
						}}
						className={'flex h-5'}
						ref={props.ref}
					>
						{children}
						<div className={'flex w-full items-center gap-[5px] self-center'}>
							{[...Array(max - min)].map((_v, index) => {
								return (
									<div
										key={index}
										className={cn(
											'h-[3px] w-full rounded bg-[rgb(255,215,92)]',
											index < values[0] &&
												'border border-[rgb(255,215,92)] bg-transparent',
											index + 1 > values[1] &&
												'border border-[rgb(255,215,92)] bg-transparent'
										)}
									/>
								);
							})}
						</div>
					</div>
				)}
				renderThumb={({ props }) => (
					<div
						{...props}
						className={
							'h-2.5 w-2.5 rounded-full border-[5px] border-[rgb(255,215,92)] bg-white p-[5px] outline-none'
						}
					/>
				)}
			/>
		</div>
	);
};
