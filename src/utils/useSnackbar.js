import { useState } from "react"

const useSnackbar = (duration = 3000) => {
    const [snackBar, setSnackbar] = useState({
        isVisible: false,
        message: ''
    });

    const showSnackBar = (message) => {
        setSnackbar({ isVisible: true, message: message});

        setTimeout(() => {
            setSnackbar({isVisible: false, message: ''})
        }, duration);
    }

    return {snackBar, showSnackBar};
}

export default useSnackbar;