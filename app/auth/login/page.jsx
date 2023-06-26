import ModalLogin from "@/components/auth/modal-login";

export default async function LoginPage() {

    return (
        <main className="my-12 mx-auto max-w-4xl">
            <div className="p-8 bg-white rounded shadow">
                <ModalLogin />
            </div>
        </main>
    )
}