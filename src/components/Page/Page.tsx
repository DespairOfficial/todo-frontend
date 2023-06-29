import Header from '../Header/Header';

interface Props {
	children: any;
}

const Page = ({ children }: Props) => {
	return (
		<>
			<Header />
			<section className="bg-gradient-to-b bg-white text-black w-1/3  min-h-fit border-solid border border-[#e6e6e6]">
				{children}
			</section>
		</>
	);
};

export default Page;
