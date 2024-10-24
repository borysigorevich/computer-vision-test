import { hexToRgb } from '@/lib/utils.ts';

type TagButtonProps = {
	text: string;
	onClick: () => void;
	color: string;
	selected: boolean;
};

export const TagButton = ({ text, onClick, color, selected }: TagButtonProps) => {
	const rgbColor = hexToRgb(color);

	return (
		<button
			onClick={onClick}
			className={
				'pointer flex items-center gap-2.5 rounded-[25px] border px-3 py-1.5 text-[12px]'
			}
			style={{
				borderColor: color,
				background: selected
					? `rgba(${rgbColor?.r}, ${rgbColor?.g}, ${rgbColor?.b}, 0.2)`
					: '',
			}}
		>
			<span
				className={'inline-block h-2 w-2 rounded-full'}
				style={{
					background: color,
				}}
			/>
			{text}
		</button>
	);
};
