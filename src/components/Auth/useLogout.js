import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../services/authService";
import toast from "react-hot-toast";


export default function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending, mutate: logout } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("userphoneNumber");
            // queryClient.removeQueries();
            queryClient.clear();
            toast.success("با موفقیت خارج شدید")
            navigate("/auth", { replace: true });
        },
    });

    return { isPending, logout };
}
