import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { axiosInstance } from '@/lib/axios';
import Loader from '@/components/Loader';


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
            <Loader />
         </div>; 
    }

    return <div> {children} </div>
}

export default AuthProvider;