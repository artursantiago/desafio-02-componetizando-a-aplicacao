import { SideBar } from '../components/SideBar'
import { Content } from '../components/Content'
import { MoviesProvider } from '../@types/contexts'

export function Home() {
  return (
    <MoviesProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MoviesProvider>
  )
}