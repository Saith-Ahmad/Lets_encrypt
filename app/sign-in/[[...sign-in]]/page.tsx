import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
      <div
      className="flex min-h-screen py-5 justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/encrypt1.png')", // 👈 place your image in /public/assets/
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Clerk SignUp form */}
      <div className="relative z-10">
        <SignIn />
      </div>
    </div>
  )
}