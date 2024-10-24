import { BoneGallery } from '@/components/bone-gallery.tsx';
import { Sidebar } from '@/components/sidebar.tsx';
import { useBonesStore } from '@/store/bones-store.ts';
import { useEffect, useState } from 'react';
import './App.css';
import { ClipLoader } from 'react-spinners';

export const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const fetchListObjectsByPath = useBonesStore((state) => state.fetchListObjectsByPath);

	useEffect(() => {
		const fetchContent = async () => {
			setIsLoading(true);
			const promises = [
				fetchListObjectsByPath('test'),
				fetchListObjectsByPath('valid'),
				fetchListObjectsByPath('train'),
			];

			await Promise.all(promises);
			setIsLoading(false);
			alert('8h');
		};

		fetchContent();
	}, []);

	return isLoading ? (
		<div className={'grid h-full w-full place-items-center'}>
			<ClipLoader />
		</div>
	) : (
		<div
			className={'grid min-h-screen w-full grid-cols-[337px_1fr] gap-12 px-8 py-6'}
		>
			<Sidebar />
			<BoneGallery />
		</div>
	);
};
