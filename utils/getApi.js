import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * A fetch wrapper for making requests to the Magic API. For
 * use in server components only.
 *
 * @param string url
 * @param bool authRequired
 * @param string requestType
 * @param {*} data
 * @returns {*}
 */
export default async function getApi(url, options = {}) {
	const { requestType, data, authRequired, cache, next } = options;
	const { user } = await getServerSession(authOptions);
	const baseUri = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

	let requestOptions = {
		method: requestType ?? "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (authRequired) {
		requestOptions.headers.Authorization = `Bearer ${user.access_token}`;
	}

	if (data) {
		requestOptions.body = JSON.stringify(data);
	}

	if (cache) {
		requestOptions.cache = cache;
	}

	if (next) {
		requestOptions.next = next;
	}

	const response = await fetch(`${baseUri}${url}`, requestOptions);

	if (response.status === 200) {
		const data = await response.json();
		return data;
	} else {
		throw new Error(response.statusText);
	}
}
