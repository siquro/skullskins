import { ToastContainer } from "react-toastify";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode,
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}