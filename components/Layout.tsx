import Footer from "./Footer";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
        <div className='body_container'>{children}</div>
      <Footer />
    </>
  )
}

export default Layout;