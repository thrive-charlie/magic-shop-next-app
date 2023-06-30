"use client";

import Link from "next/link";
import { BiLogInCircle } from "react-icons/bi";
import { useDisclosure } from "@mantine/hooks";

import ApplicationLogo from "@/components/ApplicationLogo";
import Button from "@/components/common/button";
import AuthModal from "@/components/auth/auth-modal";
import AccountDropdown from "@/components/Layouts/AccountDropdown";
import MiniCart from "@/components/mini-cart/MiniCart";

const Navigation = ({ user }) => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<nav className='bg-white border-b border-gray-100'>
			{/* Primary Navigation Menu */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<div className='flex-shrink-0 flex items-center'>
						<Link href='/'>
							<ApplicationLogo className='block h-10 w-auto fill-current text-gray-600' />
						</Link>
						<div className='hidden space-x-8 sm:-my-px sm:ml-10 sm:flex'>
							<Link href='/products'>Products</Link>
						</div>
					</div>

					<div className='flex items-center justify-end'>
						<MiniCart />
						{user ? (
							<AccountDropdown name={user.first_name} />
						) : (
							<>
								<Button onClick={open} icon={BiLogInCircle}>
									Login
								</Button>
								<AuthModal open={opened} close={close} />
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
