import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import leftArrowIcon from '../../assets/images/leftArrow.svg';

export const Pagination = (props: ReactPaginateProps) => {
	return (
		<ReactPaginate
			previousLabel={<img src={leftArrowIcon} alt="prev" />}
			nextLabel={
				<img
					src={leftArrowIcon}
					style={{
						transform: 'rotate(180deg)',
					}}
					alt="next"
				/>
			}
			pageRangeDisplayed={3}
			marginPagesDisplayed={3}
			pageLinkClassName={
				'w-full h-full flex items-center justify-center text-[12px] relative z-[1111]'
			}
			previousClassName={'mr-2.5'}
			nextClassName={'ml-2.5 text-0 pointer'}
			containerClassName={'flex items-center'}
			activeClassName={'pagination-active'}
			pageClassName={'pagination-page w-[29px] h-[29px] rounded-full pointer '}
			breakClassName={'pagination-break w-[29px] h-[29px] rounded-full pointer'}
			disabledClassName={'cursor-auto opacity-30'}
			{...props}
		/>
	);
};
