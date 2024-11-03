/*

  <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
 */

import { Link, Outlet, Route, Routes } from 'react-router-dom'
import MainView from '@/components/MainView/MainView.tsx'
import AssistantView from '@/components/AssistantView/AssistantView.tsx'
import { ROUTES } from '@/constants/routes.ts'

const Layout = () => {
  return (
    <>
      <header className="px-6">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li> */}
            {/*  <Link to="/assistant">Assistant</Link> */}
            {/* </li> */}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.Home} element={<Layout />}>
        <Route index element={<MainView />} />
        <Route path={ROUTES.Assistant} element={<AssistantView />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  )
}

export default App
