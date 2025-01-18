import { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "../../../service/productsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch {

        res.status(500).json({ message: "Internal Server Error" });
    }
}
