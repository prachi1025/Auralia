const Loader = () => {
  return (
    <div
        className="size-14 
            rounded-full 
            border-4 border-transparent 
            animate-spin
            bg-gradient-to-tr from-pink-500 via-purple-500 to-sky-500
            p-[2px]"
        >
            {/* Transparent center with dark background inside */}
            <div className="h-full w-full rounded-full bg-background" />
        </div>
  )
}

export default Loader