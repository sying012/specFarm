import Header from "./Header"
import Footer from "./Footer"
import '../styles/Layout.css'

const Layout = () => {
    return (
        <div className="layout">
            <Header />
            <main className="main">
                <h2>레이아웃</h2>
            </main>
            <Footer />
        </div>
    )
}

export default Layout