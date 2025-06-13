import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';

const useUserLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('code_verifier');

        queryClient.clear();

        queryClient.refetchQueries();
        navigate(location.pathname, { replace: true });
    };

    return logout;
};

export default useUserLogout;