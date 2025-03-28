import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleChange(e) {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast.error("Por favor, preencha todos os campos", {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            });
            setLoading(false);
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success(
            "Login realizado com sucesso! Bem vindo a dashboard da Lotus",
        {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
        }
        );
        setLoading(false);
        router.push("/dashboard");
    } catch (error) {
        if (error.code === "auth/network-request-failed") {
        toast.error(
            "Ocorreu um erro de rede. Por favor, verifique sua internet e tente novamente mais tarde",
            {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            }
        );

        setLoading(false);
        return;
    }

        if (error.code === "auth/invalid-credential") {
        toast.error(
            "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente",
            {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
            }
        );

            setLoading(false);
        return;
        }

    toast.error("Erro ao fazer login! Tente novamente mais tarde", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
    });
        setLoading(false);
    }
}
}