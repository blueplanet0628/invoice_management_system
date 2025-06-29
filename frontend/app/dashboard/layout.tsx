import MainLayout from "@/component/Layout/MainLayout"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}

