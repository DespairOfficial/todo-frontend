import { PaginationMeta } from '../../interfaces/pagination/paginationMeta';

interface Props {
	meta: PaginationMeta;
	setPage: (page: number) => void;
	isFetching: boolean;
}

const Paginator = ({ meta, setPage, isFetching }: Props) => {
	const onNextPage = () => {
		if (meta.next) {
			setPage(meta.next);
		}
	};

	const onPrevPage = () => {
		if (meta.previous) {
			setPage(meta.previous);
		}
	};

	const firstOnCurrentPage = (meta.current - 1) * meta.limit + 1;
	const lastOnCurrentPage = meta.current === meta.last ? meta.total : meta.current * meta.limit;

	return (
		<div className="bg-[#f7f7f7] p-3 flex flex-row justify-between">
			<div>
				Todos (
				{!isFetching && (
					<span>
						{firstOnCurrentPage}-{lastOnCurrentPage} from {meta.total}
					</span>
				)}
				)
			</div>

			<div className="flex">
				<div className="w-fit">
					<svg
						onClick={onPrevPage}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</div>
				<div className="w-fit">
					<svg
						onClick={onNextPage}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</div>
			</div>
		</div>
	);
};
export default Paginator;
