import { auth, db } from "../../lib/firebaseAdmin";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { email, password, displayName, usuario } = req.body;

    try {
        // Cria o usuário com Firebase Auth
        const userRecord = await auth.createUser({
            email,
            password,
            displayName,
            usuario
        });

        // Prepara os dados que serão armazenados no Firestore
        const userData = {
            uid: userRecord.uid,
            email: userRecord.email,
            nameCompleto: userRecord.displayName,
            usuario: userRecord.usuario,
            createdAt: new Date().toISOString(),
        // Você pode adicionar mais campos conforme necessário
        };

        // Cria um documento no Cloud Firestore, utilizando o UID como ID do documento
        await db.collection("users").doc(userRecord.uid).set(userData);

        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}
