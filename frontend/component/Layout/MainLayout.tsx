import Header from '../header'
import Sidebar from '../sidebar'

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div className='bg-[#edf2f6] flex relative'>
        <div className='hidden lg:block'>
          <Sidebar />
        </div>
        <div className="w-full ">
          {children}
        </div>
      </div>
      {/* <FooterBar /> */}
    </div>
  )
}

