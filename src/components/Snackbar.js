const Snackbar = ({message, isVisible}) => {
    if(!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 z-50">
            {message}
        </div>
    )
}

export default Snackbar;