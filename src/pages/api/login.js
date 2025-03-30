import { auth } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

        const { email } = req.body;

        try {
        const user = await auth.getUserByEmail(email);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}