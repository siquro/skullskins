export const EditPencil = ({ className }: { className: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            className={className}
            height="48" viewBox="0 96 960 960"
            width="48">
            <path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" /></svg>
    )
}
export const EmailSVG = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="30" viewBox="0 96 960 960" width="30"><path d="M140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302 340-223v-55L480 534 140 316v55l340 223Z" /></svg>
}
export const CloseBTNSVG = ({ className }: { className: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48" viewBox="0 96 960 960"
            className={className}
            width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg>
    )
}