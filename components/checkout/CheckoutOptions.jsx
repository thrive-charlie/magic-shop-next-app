import useApi from "@/utils/useApi";
import Button from "../common/button";

async function getCheckoutSummary() {
    const { serverApiRequest } = useApi();
    return await serverApiRequest({
        url: '/checkout/summary',
        method: 'GET',
        auth: true,
    });
}

export default async function CheckoutOptions() {

    const { data, error } = await getCheckoutSummary();
    console.log(data);

    return (
        <>
            <ul className="mb-4 bg-gray-100 p-4 rounded">
                {data?.cart?.map((item) => (
                    <li key={item.id} className="flex items-center justify-between">
                        <p>{item.quantity} x {item.product_name}</p>
                        <p>£{item.product_price}</p>
                    </li>
                ))}
            </ul>

            <div>
                {data.shipping_options.map((option) => (
                    <div key={option.id} className="my-4 p-4 rounded bg-gray-100 flex justify-between">
                        <p>{option.label}</p>
                        <p>+ £{option.price}</p>
                    </div>
                ))}
            </div>

            <ul className="my-4 p-4 bg-gray-100 rounded">
                <li className="flex justify-between items-center">
                    <p>Subtotal</p>
                    <p>£{data?.totals.subtotal}</p>
                </li>
                <li className="flex justify-between items-center">
                    <p>Shipping</p>
                    <p>£0.00</p>
                </li>
                <li className="flex justify-between items-center">
                    <p>VAT</p>
                    <p>£{data?.totals.vat}</p>
                </li>
                <li className="flex justify-between items-center">
                    <p>Grand Total</p>
                    <p>£{data?.totals.total}</p>
                </li>
            </ul>

            <div className="my-4 p-4 rounded bg-gray-100 flex flex-col gap-y-4">
                <p>Payment Options</p>
                <button className="p-2 bg-emerald-300 rounded block text-center transition-all hover:bg-opacity-50">Pay Upfront</button>
                <button className="p-2 bg-emerald-300 rounded block text-center transition-all hover:bg-opacity-50">50% Upfront, 50% Invoiced</button>
            </div>

            <div className="flex justify-center">
                <Button>Checkout</Button>
            </div>

        </>
    )
}
