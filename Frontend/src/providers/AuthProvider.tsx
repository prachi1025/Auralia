import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { axiosInstance } from '@/lib/axios';


const updateApiToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in the Authorization header
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];  // Remove the token if it's null        
    }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token)

                
            } catch (error) {
                updateApiToken(null); // Clear token on error
                console.error('Error fetching token in AuthProvider:', error);
            } finally {
                setLoading(false); // Set loading to false after attempting to fetch the token
            }
        }

        initAuth()
    }, [getToken])

    if (loading) {
        return <div className='min-h-screen w-full flex justify-center items-center'>
            <div
                className="h-14 w-14 
                rounded-full 
                border-4 border-transparent 
                animate-spin
                bg-gradient-to-tr from-pink-500 via-purple-500 to-sky-500
                p-[2px]
                "
            >
                {/* Transparent center with dark background inside */}
                <div className="h-full w-full rounded-full bg-background" />
            </div>
        </div>; 
    }

    return <div> {children} </div>
}

export default AuthProvider;