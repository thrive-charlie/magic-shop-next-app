import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import Navigation from "@/components/Layouts/Navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const AppLayout = async ({ header, children }) => {
	const session = await getServerSession(authOptions);

	return (
		<div className='min-h-screen bg-gradient-pastel'>
			<Navigation user={session?.user} />

			{/* Page Content */}
			<Suspense fallback={<p>Loading data...</p>}>
				<main>{children}</main>
			</Suspense>
		</div>
	);
};

export default AppLayout;
