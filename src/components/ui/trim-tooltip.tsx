import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { ComponentRef, PropsWithChildren, useEffect, useRef, useState } from 'react';

export const TrimTooltip = ({ children }: PropsWithChildren) => {
	const containerRef = useRef<ComponentRef<'div'>>(null);
	const [showTooltip, setShowTooltip] = useState(false);

	useEffect(() => {
		const resize = () => {
			if (!containerRef.current) return;

			const compare =
				containerRef.current?.scrollWidth > containerRef.current?.clientWidth;

			setShowTooltip(compare);
		};

		resize();

		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger asChild>
					<div
						ref={containerRef}
						className={
							'mt-0.5 truncate text-[12px] font-light leading-[14.63px]'
						}
					>
						{children}
					</div>
				</TooltipTrigger>
				{showTooltip && <TooltipContent>{children}</TooltipContent>}
			</Tooltip>
		</TooltipProvider>
	);
};
