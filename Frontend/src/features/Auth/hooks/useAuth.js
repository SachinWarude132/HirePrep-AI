
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
    login,
    register,
    getme,
    logout
} from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const {
        user,
        setUser,
        loading,
        setLoading
    } = context;

    console.log(user, loading);

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);

            const data = await register({
                username,
                email,
                password
            });

            setUser(data.user);
        } catch (error) {
            console.log(
                "REGISTER ERROR:",
                error.response?.data?.message || error.message
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);

            const data = await login({
                email,
                password
            });

            setUser(data.user);
        } catch (error) {
            console.log(
                "LOGIN ERROR:",
                error.response?.data?.message || error.message
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);

            await logout();

            setUser(null);
        } catch (error) {
            console.log(
                "LOGOUT ERROR:",
                error.response?.data?.message || error.message
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleGetme = async () => {
        try {
            setLoading(true);

            const data = await getme();

            setUser(data.user);
        } catch (error) {
            console.log(
                "GETME ERROR:",
                error.response?.data?.message || error.message
            );

            setUser(null);

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleGetme,
        handleLogout
    };
};

