import BlockBuilder from "@/components/blocks/BlockBuilder";
import useApi from "@/utils/useApi";

async function getHomepage() {
	const { serverWpRequest } = useApi();
	return await serverWpRequest({ url: "/wp/v2/pages/6" });
}

export default async function Home() {

	const { data, error } = await getHomepage();

	return (
		<main className='max-w-7xl mx-auto w-full'>
			<div className='mt-8 p-8 bg-white rounded bg-shadow'>
				<h1 className='text-4xl font-bold tracking-tighter mb-2'>
					Magic Shop
				</h1>
				<p className="text-md">Proof of concept for NextJS/Laravel setup</p>

				<div className="p-4 mt-4 border-2 border-dashed border-slate-500">
					<em>Content from WordPress</em>
					<BlockBuilder blocks={data.acf.page_content} />
				</div>

				{/* <pre className="block p-2 bg-slate-100">{JSON.stringify(data, null, 4)}</pre> */}
			</div>
		</main>
	);
}
