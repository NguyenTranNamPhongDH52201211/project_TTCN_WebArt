import React, { useState, createContext, useContext } from "react";
import Toast from "../Toast/Toast";


const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ id: Date.now(), message, type });
    };

    const closeToast = () => {
        setToast(null);
    };
    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}
        </ToastContext.Provider>
    );
};

export default ToastProvider;