import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default function useApi() {
	return { apiRequest, serverApiRequest, wpRequest, serverWpRequest };
}

async function apiRequest({
	url,
	method = "GET",
	body = {},
	token = false,
	next = {},
}) {
	let data = null;
	let error = null;

	try {
		// Remove the first slash from the url
		url = url.replace(/^\/|\/$/g, "");

		// Set up the options of the request
		let options = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (token) {
			options.headers.Authorization = `Bearer ${token}`;
		}

		if (Object.keys(body).length > 0) {
			options.body = JSON.stringify(body);
		}

		// Make the request
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`,
			options
		);

		// Get the data
		data = await res.json();
	} catch (error) {
		console.log(error);
		return { data, error };
	}

	return { data, error };
}

async function serverApiRequest({
	url,
	method = "GET",
	body = {},
	auth = false,
	next = {},
}) {
	const session = await getServerSession(authOptions);

	let data = null;
	let error = null;

	try {
		// Remove the first slash from the url
		url = url.replace(/^\/|\/$/g, "");

		// Set up the options of the request
		let options = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (auth) {
			if (!session?.user?.access_token) {
				throw new Error("No access token found - Is user logged in?");
			}
			options.headers.Authorization = `Bearer ${session.user.access_token}`;
		}

		if (body.length > 0) {
			options.body = JSON.stringify(body);
		}

		// Make the request
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`,
			options
		);

		// Get the data
		data = await res.json();
	} catch (error) {
		console.log(error);
		return { data, error };
	}

	return { data, error };
}

async function wpRequest() {}

async function serverWpRequest({ url, ...args }) {
	// Replace first slash
	url = url.replace(/^\/|\/$/g, "");

	const res = await fetch(`${process.env.WORDPRESS_API_URL}/${url}`, {
		...args,
	});
	const data = await res.json();
	return { data, error: null };
}

async function request() {}
