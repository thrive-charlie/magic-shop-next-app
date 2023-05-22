import { Suspense } from "react"
import { getServerSession } from "next-auth/next"
import Navigation from '@/components/Layouts/Navigation'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

const AppLayout = async ({ header, children }) => {

    const session = await getServerSession(authOptions)

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={session?.user} />

            {/* Page Heading */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <Suspense fallback={<p>Loading data...</p>}>
                <main>{children}</main>
            </Suspense>
        </div>
    )
}

export default AppLayout
  