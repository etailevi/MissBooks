const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { AppHeader } from "./views/app-header.jsx";
import { HomePage } from "./views/home.jsx";
import { BookIndex } from "./views/book-index.jsx";
import { AboutUs } from "./views/about.jsx";
import { BookDetails } from "./views/book-details.jsx";
import { BookEdit } from "./views/book-edit.jsx";

export function App() {

    return (
        <Router>
            <section className="app main-layout">

                <AppHeader />

                <main className="main-layout full">
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/book" element={<BookIndex />}></Route>
                        <Route path="/about" element={<AboutUs />}></Route>
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
} 