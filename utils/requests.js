import useSWR from 'swr';

/**
 * An Axios wrapper function to be used by the
 * useSwr hook.
 * 
 * @param {*} url 
 * @returns 
 */
export const fetcher = url => {
    return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`)
        .then(res => res.data);
}

export const useGetProducts = () => {
    const { data } = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);

    return {
        products: data,
    }
}