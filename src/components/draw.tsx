import { BODY_PART_COLOR_MAP, BODY_PART_CLASS_NAMES } from '@/lib/constants';
import { hexToRgb } from '@/lib/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Line, Rect, Stage, Text } from 'react-konva';

interface Detail {
	coords: number[];
	className: string;
}

type DrawBonesProps = {
	details: Detail[];
	imgSrc: string;
	containerClassName: string;
	imageClassName: string;
	title: string;
	strokeWidth: number;
	fontSize: number;
};

const getBoundingBox = (coords: number[]): [number, number, number, number] => {
	const xCoords = coords.filter((_, i) => i % 2 === 0);
	const yCoords = coords.filter((_, i) => i % 2 === 1);

	const minX = Math.min(...xCoords);
	const minY = Math.min(...yCoords);
	const maxX = Math.max(...xCoords);
	const maxY = Math.max(...yCoords);

	return [minX, minY, maxX - minX, maxY - minY];
};

export const Draw: React.FC<DrawBonesProps> = ({
	details,
	imgSrc,
	containerClassName,
	imageClassName,
	title,
	strokeWidth,
	fontSize,
}) => {
	const canvasRef = useRef<HTMLDivElement>(null);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

	const updateCanvasSize = useCallback(() => {
		if (canvasRef.current) {
			setCanvasSize({
				width: canvasRef.current.offsetWidth,
				height: canvasRef.current.offsetHeight,
			});
		}
	}, []);

	useEffect(() => {
		updateCanvasSize();
		window.addEventListener('resize', updateCanvasSize);

		return () => window.removeEventListener('resize', updateCanvasSize);
	}, [updateCanvasSize]);

	const onImageLoad = useCallback(() => {
		updateCanvasSize();
	}, [updateCanvasSize]);

	return (
		<div className={containerClassName} ref={canvasRef}>
			<img
				src={imgSrc}
				onLoad={onImageLoad}
				className={imageClassName}
				alt={title}
				loading={'lazy'}
			/>
			<Stage
				width={canvasSize.width}
				height={canvasSize.height}
				className="absolute left-0 top-0 h-full w-full"
			>
				<Layer>
					{details.map((detail, index) => {
						const { coords, className } = detail;
						const [x, y, width, height] = getBoundingBox(coords);
						const classColor =
							BODY_PART_COLOR_MAP[BODY_PART_CLASS_NAMES[+className]];
						const rgbColor = hexToRgb(classColor);

						return (
							<React.Fragment key={index}>
								<Rect
									x={x * canvasSize.width}
									y={y * canvasSize.height - fontSize * 1.2}
									width={width * canvasSize.width}
									height={fontSize * 1.2}
									fill={classColor}
									cornerRadius={strokeWidth * 6}
								/>
								<Rect
									x={x * canvasSize.width}
									y={y * canvasSize.height - fontSize * 1.2}
									width={width * canvasSize.width}
									height={height * canvasSize.height + fontSize * 1.2}
									stroke={classColor}
									strokeWidth={strokeWidth * 2}
									cornerRadius={strokeWidth * 6}
								/>
								<Line
									points={coords.map((point, i) =>
										i % 2 === 0
											? point * canvasSize.width
											: point * canvasSize.height
									)}
									closed
									stroke={classColor}
									fill={`rgba(${rgbColor?.r}, ${rgbColor?.g}, ${rgbColor?.b}, 0.15)`}
									strokeWidth={strokeWidth}
								/>
								<Text
									x={(x + x * 0.01) * canvasSize.width}
									y={y * canvasSize.height - fontSize}
									text={`${BODY_PART_CLASS_NAMES[+className]} ${index}`}
									fontSize={fontSize}
									ellipsis
									width={width * canvasSize.width}
									wrap="none"
								/>
							</React.Fragment>
						);
					})}
				</Layer>
			</Stage>
		</div>
	);
};
