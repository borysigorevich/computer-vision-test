import { Draw } from '@/components/draw.tsx';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { TrimTooltip } from '@/components/ui/trim-tooltip.tsx';
import { BODY_PART_CLASS_NAMES, BODY_PART_COLOR_MAP } from '@/lib/constants.ts';

type Detail = {
	className: string;
	coords: number[];
};

type BoneVisualizationCardProps = {
	title: string;
	details: Detail[];
	lowResImage: string;
	highResImage: string;
};

export const BoneVisualizationCard = ({
	title,
	details,
	lowResImage,
	highResImage,
}: BoneVisualizationCardProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="pointer w-full overflow-hidden">
					<div className="relative w-full overflow-hidden pt-[100%]">
						<Draw
							details={details}
							imageClassName="w-full h-full object-cover"
							containerClassName="w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
							imgSrc={lowResImage}
							title={title}
							strokeWidth={0.5}
							fontSize={2}
						/>
					</div>
					<TrimTooltip>{title}</TrimTooltip>
				</div>
			</DialogTrigger>
			<DialogContent className="max-h-[559px]">
				<DialogHeader>
					<DialogTitle className="text-[14px] font-normal leading-[17.07px]">
						{title}
					</DialogTitle>
					<p className="mt-4 shrink text-[12px] font-light leading-[14.63px]">
						Details:
					</p>
					<div className="wrap mb-5 flex items-center gap-2">
						{details?.map(({ className }, index) => (
							<div
								key={index}
								className="rounded-[10px] px-[22px] py-1 text-[12px] font-medium"
								style={{
									background:
										BODY_PART_COLOR_MAP[
											BODY_PART_CLASS_NAMES[+className]
										],
								}}
							>
								{`${BODY_PART_CLASS_NAMES[+className]} ${index}`}
							</div>
						))}
					</div>
				</DialogHeader>
				<Draw
					details={details}
					imageClassName="w-full h-full object-cover"
					containerClassName="relative overflow-hidden"
					imgSrc={highResImage}
					title={title}
					strokeWidth={1.5}
					fontSize={10}
				/>
			</DialogContent>
		</Dialog>
	);
};
